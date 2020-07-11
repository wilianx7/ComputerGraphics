import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReportTypePipe } from './report-type.pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ReportTypePipe,
    ],
    exports: [
        ReportTypePipe,
    ]
})
export class PipeModule { }
