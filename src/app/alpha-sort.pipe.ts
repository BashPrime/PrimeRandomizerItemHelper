import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'alphaSort'
})
export class AlphaSortPipe implements PipeTransform {

    transform(array: Array<string>, args: string): Array<string> {
        array.sort((a: any, b: any) => {
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }

}
