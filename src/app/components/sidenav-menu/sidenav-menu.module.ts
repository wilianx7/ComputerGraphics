import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgtSvgModule } from 'ng-tailwind';

import { SidenavMenuComponent } from './sidenav-menu.component';

@NgModule({
  declarations: [SidenavMenuComponent],
  exports: [SidenavMenuComponent],
  imports: [
    CommonModule,
    NgtSvgModule
  ]
})
export class SidenavMenuModule { }
