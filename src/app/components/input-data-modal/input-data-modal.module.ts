import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgtButtonModule, NgtInputModule, NgtModalModule, NgtStylizableModule } from 'ng-tailwind';

import { InputDataModalComponent } from './input-data-modal.component';

@NgModule({
  declarations: [InputDataModalComponent],
  exports: [InputDataModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgtModalModule,
    NgtInputModule,
    NgtButtonModule,
    NgtStylizableModule
  ]
})
export class InputDataModalModule { }
