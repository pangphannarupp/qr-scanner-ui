import { Injectable } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class QrScannerService {
  test: any;
  scanSub: any;
  constructor(
    private qrScanner: QRScanner,
    private alertCtrl: AlertController
  ) { }

  /*
  * scan
  * @usage      scan qr code
  */
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

  /*
  * showCamera
  * @usage      add camera qr code scanner into content
  */
  private showCamera() {
    document.querySelector('ion-content').classList.add('cameraView');
    document.querySelector('ion-toolbar').classList.add('cameraView1');
  }

  /*
  * hideCamera
  * @usage      remove camera qr code scanner from content
  */
  private hideCamera() {
    document.querySelector('ion-content').classList.remove('cameraView');
    document.querySelector('ion-toolbar').classList.remove('cameraView1');
  }

  /*
  * lightOn
  * @usage      show flash
  */
  lightOn(){
    this.qrScanner.enableLight().then(result => {
      console.log(result);
    }).catch(error => {
      console.log(error);
    });
  }

  /*
  * lightOff
  * @usage      hide flash
  */
  lightOff(){
    this.qrScanner.disableLight().then(result => {
      console.log(result);
    }).catch(error => {
      console.log(error);
    });
  }

  /*
  * alert
  * @usage      alert message of camera permission
  */
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
