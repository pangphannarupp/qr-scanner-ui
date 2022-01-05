import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'test-qr',
    pathMatch: 'full'
  },
  {
    path: 'test-form',
    loadChildren: () => import('./test-form/test-form.module').then( m => m.TestFormPageModule)
  },
  {
    path: 'qr-scan',
    loadChildren: () => import('./qr-scan/qr-scan.module').then( m => m.QrScanPageModule)
  },
  {
    path: 'scaner-qr',
    loadChildren: () => import('./scaner-qr/scaner-qr.module').then( m => m.ScanerQrPageModule)
  },
  {
    path: 'test-qr',
    loadChildren: () => import('./test-qr/test-qr.module').then( m => m.TestQrPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
