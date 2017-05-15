import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, Tabs  } from 'ionic-angular';
import { Http } from '@angular/http';

import { DetailPage } from '../../pages/detail/detail';
import { MyData } from '../../providers/my-data';
import { ContactPage } from '../contact/contact';
import { OppointmentPage } from '../oppointment/oppointment';

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
    private http: Http,
    public storage: Storage,
    private tab: Tabs
  ) { 
    this.CommonDisease = [{
        "code": "1",
        "Value": "高血压",
        "icon" : "podium",
        "color": "#80ECA0"
      },{
        "code": "2",
        "Value": "高血脂",
        "icon" : "ice-cream",
        "color": "#619BFD"
      },{
        "code": "3",
        "Value": "糖尿病",
        "icon" : "water",
        "color": "#F7B132"
      },{
        "code": "4",
        "Value": "冠心病",
        "icon" : "medkit",
        "color": "#e783ff"
      },{
        "code": "5",
        "Value": "心脏病",
        "icon" : "heart",
        "color": "#F3A0A0"
      }
    ]
    this.storage.set('CommonDisease',this.CommonDisease);
   }
  
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

  goModel(a){
    switch (a) {
      case 1:
        this.tab.select(1);
        //this.navCtrl.push(ContactPage);
        break;
      case 2:
        this.navCtrl.push(ContactPage,{tab:2});
        break;
      case 3:
        this.tab.select(2);
        break;
      case 4:
       this.navCtrl.push(OppointmentPage);
        break;
    
      default:
        break;
    }
  }
}
