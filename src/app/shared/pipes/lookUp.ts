import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'lookUp'
})
export class LookUpPipe implements PipeTransform {
  transform(val: string, dict: {[key: string]: string } ) {
    return dict[val];
  }
}