import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.page.html',
  styleUrls: ['./qr-scan.page.scss'],
})
export class QrScanPage implements OnInit {
  @ViewChild('test') test: ElementRef;
  scanData : {};
  options :BarcodeScannerOptions;
  constructor(
    private barcodeScanner: BarcodeScanner
  ) { 
  }

  ngOnInit() {
  }

  scan(){
    this.options = {
        prompt : "Scan your barcode ",
        showTorchButton: false,
        preferFrontCamera: false,
        showFlipCameraButton: false,
        torchOn: false,
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {
        console.log(barcodeData);
        this.scanData = barcodeData;
    }, (err) => {
        console.log("Error occured : " + err);
    });         
  } 
}
