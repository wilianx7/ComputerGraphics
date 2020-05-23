import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgtSvgModule } from 'ng-tailwind';

import { RadarComponent } from './radar.component';



@NgModule({
  declarations: [RadarComponent],
  exports: [RadarComponent],
  imports: [
    CommonModule,
    NgtSvgModule
  ]
})
export class RadarModule { }
