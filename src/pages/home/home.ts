import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';

import { DetailPage } from '../../pages/detail/detail';
import { MyData } from '../../providers/my-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ MyData ]
})
export class HomePage implements OnInit{
  public News: any;
  public Weather: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpData: MyData,
    public storage: Storage
  ) { }
  
  ngOnInit(){
    let url = '/api/';
    let str_NewsInquiry='str=' + '<Request>   <PageSize>6</PageSize>     <PageIndex>1</PageIndex>   </Request>';
    let str_WeatherInquiry='str=' + '<Request> <currentCity>郑州市</currentCity> </Request>';
    this.httpData.connect(url+'NewsInquiry',str_NewsInquiry).subscribe(
      res => {
        this.News = res.NewsInquiry;
        this.storage.set('news',this.News);
      }
    );

    this.httpData.connect(url+'WeatherInquiry',str_WeatherInquiry).subscribe(
      res => {
        
        res.WeatherInquiry.forEach(element => {
          this.Weather = element;
        });
      }
    );
  }

  new_detail(id){
    this.navCtrl.push(DetailPage, { new_id: id });
  }

}
