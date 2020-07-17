import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberFormatPipe'
})
export class NumberFormatPipe implements PipeTransform {
    public transform(value: any): string {
        if (value) {
            return new Intl.NumberFormat('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
        }

        return '0';
    }
}
