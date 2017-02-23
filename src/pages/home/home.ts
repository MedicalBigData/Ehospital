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
  public CommonDisease: any;
  public cnt: number =1;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpData: MyData,
    public storage: Storage
  ) { }
  
  ngOnInit(){
    let url = '/api/';
    let str_NewsInquiry='str=' + '<Request>   <PageSize>2</PageSize>     <PageIndex>'+this.cnt+'</PageIndex>   </Request>';
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

    this.httpData.connect(url+'CommonDiseaseInquiry',str_WeatherInquiry).subscribe(
      res => {
          console.log(res);
          this.CommonDisease = res.CommonDiseaseInquiry;
      }
    );
  }

  new_detail(id){
    this.navCtrl.push(DetailPage, { new_id: id });
  }
  commonDisease(id){
    this.navCtrl.push(DetailPage, { disease_id: id });
  }

  doInfinite(infiniteScroll){
    let url = '/api/';
    let str_NewsInquiry='str=' + '<Request>   <PageSize>2</PageSize>     <PageIndex>'+(this.cnt+=2)+'</PageIndex>   </Request>';
    this.httpData.connect(url+'NewsInquiry',str_NewsInquiry).subscribe(
      res => {
        if (res.NewsInquiry[0].MessageCode === '2') {
          infiniteScroll.complete();
          infiniteScroll.enable(false);
        }else{
          res.NewsInquiry.forEach(element => {
            this.News.push(element);
          });
          this.storage.set('news',this.News);
          infiniteScroll.complete();
        }
        
      }
    );
  }

}
