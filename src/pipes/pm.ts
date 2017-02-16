import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Pm pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'pm'
})
@Injectable()
export class Pm {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value: number) {
    let res: string;
    if (value<=50) {
      res = "优";
    }else if(50<value && value<=100){
      res = "良好";
    }else if(100<value && value<=150){
      res = "轻度污染";
    }else if(150<value && value<=200){
      res = "中度污染";
    }else if(200<value && value<=300){
      res = "重度污染";
    }else if(300<value){
      res = "严重污染";
    }
    return res;
  }
}
