import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestQrPage } from './test-qr.page';

const routes: Routes = [
  {
    path: '',
    component: TestQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestQrPageRoutingModule {}
