import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgtSidenavModule, NgtStylizableModule } from 'ng-tailwind';
import { SidenavMenuModule } from 'src/app/components/sidenav-menu/sidenav-menu.module';

import { DefaultPageComponent } from './default-page.component';

// const routes: Routes = [
//   {
//     "path": "",
//     "component": HomeComponent
//   },
// ];

@NgModule({
  declarations: [DefaultPageComponent],
  exports: [DefaultPageComponent],
  imports: [
    CommonModule,
    NgtSidenavModule,
    SidenavMenuModule,
    NgtStylizableModule,
    RouterModule,
  ]
})
export class DefaultPageModule { }
