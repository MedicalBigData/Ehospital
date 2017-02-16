import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { MyData } from '../../providers/my-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ MyData ]
})
export class HomePage implements OnInit{

  constructor(
    public navCtrl: NavController,
    public httpData: MyData
  ) { }
  
  ngOnInit(){
    let url = '/api/NewsInquiry';
    let str='str=' + '<Request>   <PageSize>1</PageSize>     <PageIndex>1</PageIndex>   </Request>';
    this.httpData.connect(
      url,str
    ).subscribe(
      res => {
        console.log(res);
      }
    );
  }

}
