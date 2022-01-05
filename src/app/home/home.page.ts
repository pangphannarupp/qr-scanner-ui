import { Component, OnInit } from '@angular/core';

import domtoimage from 'dom-to-image';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import * as html2canvas from 'html2canvas';
import {PDFGenerator}  from '@ionic-native/pdf-generator/ngx';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  test: any;
  constructor(
    private file: File,
    private fileOpener: FileOpener,
    private plt: Platform,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.queryParams.subscribe(param => {
      this.test = param.token;
    })
  }
    pdfObj = null;

  ngOnInit(){
    console.log(this.plt.is('cordova'));
    
  }
  createPdf1(){

    var rows = [];
      rows.push(['Nr.', 'Name', 'Beschreibung', 'Preis', 'Anzahl', 'MwSt(%)']);

    for(var i of [1,2,3,4]) {
      rows.push(['#.'+i, 'xx', 'xx', 'xx', 'xx', 'xx']);
}
    const doc = {
      content: [{
        table: {
          body: rows
        }
      }]
    }
    this.pdfObj = pdfMake.createPdf(doc);
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        const blob = new Blob([buffer], {type: 'application/pdf' });
        this.file.writeFile(this.file.dataDirectory, 'myfile.pdf', blob, { replace: true }).then(fileEntry => {
          this.fileOpener.open(this.file.dataDirectory + 'myfile.pdf', 'application/pdf');
        });
      });
    }
  }

  createPdf(){
    const pdfBlock = document.getElementById('print-wrapper');
    const options = {
      background: "white",
      height: pdfBlock.clientHeight,
      width: pdfBlock.clientWidth,
    };
    const option = {
      documentSize: 'A4',
      type: 'share'
    }
    htmlToImage.toPng(pdfBlock,options).then ((fileUrl) =>{
      // this.pdfGenerator.fromURL('https://stackoverflow.com/questions/28669480/generating-pdf-file-with-ionic-framework', option).
      // then(resolve => {
      //   console.log(resolve);
      // }
      // ).catch((err) => {
      //   console.error(err);
      // });
      const doc = {
        content: [{
          image: fileUrl,
          fit: [pdfBlock.clientWidth, pdfBlock.clientHeight]
        }
        ],
      }
      pdfMake.createPdf(doc).open();
    });
    // html2canvas.default(pdfBlock).then((canvas)=> {
    //   const img=canvas.innerHTML;
    //   this.pdfGenerator.fromData(img, option).
    //   then(resolve => {
    //     console.log(resolve);
    //   }
    //   ).catch((err) => {
    //     console.error(err);
    //   });
		// });
  //   domtoimage.toPng(pdfBlock).then(fileUrl => {
  //     const htmlImage = new Image();
  //     htmlImage.src = fileUrl;
  //     const pdf = new jsPDF( 'p', 'mm','a4' );
  //     pdf.addImage( htmlImage.src, 'JPEG', 10, 10, 750, 400 );
  //     pdf.save( 'hello.pdf' );
  //  });
  }
}
