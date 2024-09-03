import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  constructor() { }

  transform(value: string | null | Date, format: string = 'yyyy-MM-dd  HH:mm a'): string | null {
   const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, format);
  }

}
