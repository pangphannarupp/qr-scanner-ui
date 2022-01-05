import { Component, OnInit } from '@angular/core';
import { QrScannerService } from '../service/qr-scanner.service';

@Component({
  selector: 'app-test-qr',
  templateUrl: './test-qr.page.html',
  styleUrls: ['./test-qr.page.scss'],
})
export class TestQrPage implements OnInit {

  isFlashOn: boolean = false;
  flashText: string = 'Turn on the flashlight';
  flashImage: string = 'flash_on';
  scannerSub: any;
  test: any;
  constructor(
    private qrScannerService: QrScannerService,
  ) {  }

  /*
  * ngOnInit
  * @uage     Open qr scanner when screen ready
  */
  async ngOnInit() {
    this.qrScannerService.scan().then((result) => {
      console.log(result);
    });
  }

  /*
  * manageFlash
  * @usage:   - hide/show flash
  *           - change icon flash
  *           - change guide flash
  */
  manageFlash() {
    if(this.isFlashOn) {
      this.qrScannerService.lightOff();
      this.flashText = 'Turn on the flashlight';
      this.flashImage = 'flash_on';
    } else {
      this.qrScannerService.lightOn();
      this.flashText = 'Turn off the flashlight';
      this.flashImage = 'flash_off';
    }
    this.isFlashOn = !this.isFlashOn;
  }
}
