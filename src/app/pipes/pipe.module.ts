import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NumberFormatPipe } from './number-format.pipe';
import { ReportTypePipe } from './report-type.pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ReportTypePipe,
        NumberFormatPipe,
    ],
    exports: [
        ReportTypePipe,
        NumberFormatPipe,
    ]
})
export class PipeModule { }
