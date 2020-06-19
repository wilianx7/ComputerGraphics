import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgtActionModule, NgtDatatableModule, NgtStylizableModule } from 'ng-tailwind';
import { InputDataModalModule } from 'src/app/components/input-data-modal/input-data-modal.module';
import { RadarModule } from 'src/app/components/radar/radar.module';
import { TrackingFunctionsModalModule } from 'src/app/components/tracking-functions-modal/tracking-functions-modal.module';
import {
  TransformationFunctionsModalModule,
} from 'src/app/components/transformation-functions-modal/transformation-functions-modal.module';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    "path": "",
    "component": HomeComponent
  },
];

@NgModule({
  declarations: [HomeComponent],
  exports: [RouterModule],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    RadarModule,
    InputDataModalModule,
    TransformationFunctionsModalModule,
    TrackingFunctionsModalModule,
    NgtStylizableModule,
    NgtDatatableModule,
    NgtActionModule
  ]
})
export class HomeModule { }
