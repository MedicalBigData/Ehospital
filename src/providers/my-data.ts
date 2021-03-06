import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the MyData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MyData {

  constructor(public http: Http) {

  }
  connect(Url: string, str: any): Observable<any>{
      let header = new Headers;
      header.append('Content-Type','application/x-www-form-urlencoded');
      let opt: RequestOptions = new RequestOptions({
       headers: header
      })   
      if(!Url.indexOf('/wxapi/')){
        return this.http.post(Url, str, opt )
                      .map(res => 
                          {
                            return JSON.parse(res.text());
                          }
                      );
      }else{
        let realUrl=Url.replace(/\/api/g,'');
        return this.http.post("http://ehome.staging.topmd.cn:81/webservices/ehomewebservice.asmx"+realUrl, str, opt )
                      .map(res => 
                          eval('(' + this.delHtmlTag(res.text()) + ')')//转化为obj对象格式
                      );
      }
      
  }
  delHtmlTag(str: string)
  {
    let res = str.replace(/<[^>]+>/g,"");//去掉所有的html标记
    return res;
  }
}
