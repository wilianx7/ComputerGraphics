import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgtButtonModule, NgtInputModule, NgtModalModule, NgtStylizableModule } from 'ng-tailwind';

import { TransformationFunctionsModalComponent } from './transformation-functions-modal.component';

@NgModule({
  declarations: [TransformationFunctionsModalComponent],
  exports: [TransformationFunctionsModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgtModalModule,
    NgtInputModule,
    NgtButtonModule,
    NgtStylizableModule
  ]
})
export class TransformationFunctionsModalModule { }
