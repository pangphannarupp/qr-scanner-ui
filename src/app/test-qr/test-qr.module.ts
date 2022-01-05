import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestQrPageRoutingModule } from './test-qr-routing.module';

import { TestQrPage } from './test-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestQrPageRoutingModule
  ],
  declarations: [TestQrPage]
})
export class TestQrPageModule {}
