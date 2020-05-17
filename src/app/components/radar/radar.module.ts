import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RadarComponent } from './radar.component';



@NgModule({
  declarations: [RadarComponent],
  exports: [RadarComponent],
  imports: [
    CommonModule
  ]
})
export class RadarModule { }
