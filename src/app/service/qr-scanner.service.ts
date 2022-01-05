import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrScannerService {
  test: any;
  scanSub: any;
  constructor(
    private qrScanner: QRScanner,
    private route: Router,
    private alertCtrl: AlertController
  ) { }

  scan(): Promise<any>{
    const testing = new Promise( (resolve) => {
      this.qrScanner.prepare().then((status: QRScannerStatus)=> {
        if (status.authorized) {
          // camera permission was granted
          this.showCamera();
          this.qrScanner.show();
          // start scanning
          this.scanSub = this.qrScanner.scan().subscribe((qrResult: any)=> {
            this.hideCamera();
            this.qrScanner.disableLight();
            this.qrScanner.hide(); // hide camera preview
            this.scanSub.unsubscribe(); // stop scanning
            this.test = qrResult;
            resolve(qrResult);
          });
        }
      }).catch((e: any) => {
        console.log('Error is', e);
        if (e.name === 'CAMERA_ACCESS_DENIED') {
          this.alert();
        }
      });
    });
    return testing;
  }

  private showCamera() {
    document.querySelector('ion-content').classList.add('cameraView');
    document.querySelector('ion-toolbar').classList.add('cameraView1');
  }

  private hideCamera() {
    document.querySelector('ion-content').classList.remove('cameraView');
    document.querySelector('ion-toolbar').classList.remove('cameraView1');
  }

  lightOn(){
    this.qrScanner.enableLight().then(result => {
      console.log(result);
    }).catch(error => {
      console.log(error);
    });
  }

  lightOff(){
    this.qrScanner.disableLight().then(result => {
      console.log(result);
    }).catch(error => {
      console.log(error);
    });
  }

  async alert(){
    const alert = await this.alertCtrl.create({
      header: 'Permission',
      message: 'Camera Permission',
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Okay',
          handler: () => {
            this.qrScanner.openSettings();
          }
        }
      ]
    });
    await alert.present();
  }
}
