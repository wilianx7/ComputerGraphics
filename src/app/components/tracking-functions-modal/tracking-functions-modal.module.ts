import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgtButtonModule, NgtInputModule, NgtModalModule, NgtStylizableModule } from 'ng-tailwind';

import { TrackingFunctionsModalComponent } from './tracking-functions-modal.component';

@NgModule({
  declarations: [TrackingFunctionsModalComponent],
  exports: [TrackingFunctionsModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgtModalModule,
    NgtInputModule,
    NgtButtonModule,
    NgtStylizableModule
  ]
})
export class TrackingFunctionsModalModule { }
