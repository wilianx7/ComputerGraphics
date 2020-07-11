import { Pipe, PipeTransform } from '@angular/core';

import { ReportTypeEnum } from '../resources/report-type.enum';

@Pipe({
    name: 'reportTypePipe'
})
export class ReportTypePipe implements PipeTransform {
    public transform(value: any): string {
        switch (value) {
            case ReportTypeEnum.AIRPORT:
                return 'Aeroporto';
            case ReportTypeEnum.COLISION:
                return 'Colisão';
            case ReportTypeEnum.NEARBY:
                return 'Aviões Próximos';
            default:
                return 'Desconhecido';
        }
    }
}
