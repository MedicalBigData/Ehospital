import { Component, OnInit, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Detail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage implements OnInit{
  @Input('src')
  public content: string;
  public content1: string;
  public content2: string;
  public content3: string;
  public content4: string;
  public content5: string;

  public title: string;
  public type: number;
  public tabs= 'abstract';
  public segments=[
      {name:'概述',value:'abstract'},
      {name:'病因',value:'cause'},
      {name:'病症',value:'symptom'},
      {name:'诊断',value:'diagnose'},
      {name:'治疗',value:'treat'}
    ];
  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams,public storage: Storage) {}
  
  ngOnInit(){

if(this.navParams.data.new_id != null){
  this.type=1;
  this.title = "健康资讯";
    this.storage.get('news').then(
      res => {
        res.forEach(element => {
          if (element.ID == this.navParams.data.new_id ) {
            this.content = element.Content
            .replace(/&lt;/g,'<')
            .replace(/&gt;/g,'>')
            .replace(/&amp;/g,'&')
            .replace(/&quot;/g,'"')
            .replace(/\"\/ueditor\/net/g,'"http://ehome.staging.topmd.cn:81/ueditor/net');
            console.log(this.content);
          }
        });
      }
    );
}else if(this.navParams.data.disease_id != null){
  this.type=2;
  switch (this.navParams.data.disease_id) {
    case '01':
      this.title = "高血压";
      this.getHtml('./assets/html/gxygaishu.html',1);
      this.getHtml('./assets/html/gxybingyin.html',2);
      this.getHtml('./assets/html/gxyzhengzhuang.html',3);
      this.getHtml('./assets/html/gxyzhenduan.html',4);
      this.getHtml('./assets/html/gxyzhiliao.html',5);
      break;
    case '02':
      this.title = "高血脂";
      this.getHtml('./assets/html/gxzgaishu.html',1);
      this.getHtml('./assets/html/gxzbingyin.html',2);
      this.getHtml('./assets/html/gxzzhengzhuang.html',3);
      this.getHtml('./assets/html/gxzzhenduan.html',4);
      this.getHtml('./assets/html/gxzzhiliao.html',5);
      break;
    case '03':
      this.title = "糖尿病";
      this.getHtml('./assets/html/tnbgaishu.html',1);
      this.getHtml('./assets/html/tnbbingyin.html',2);
      this.getHtml('./assets/html/tnbzhengzhuang.html',3);
      this.getHtml('./assets/html/tnbzhenduan.html',4);
      this.getHtml('./assets/html/tnbzhiliao.html',5);
      break;
    case '04':
      this.title = "冠心病";
      this.getHtml('./assets/html/gxbgaishu.html',1);
      this.getHtml('./assets/html/gxbbingyin.html',2);
      this.getHtml('./assets/html/gxbzhengzhuang.html',3);
      this.getHtml('./assets/html/gxbzhenduan.html',4);
      this.getHtml('./assets/html/gxbzhiliao.html',5);
      break;
    case '05':
      this.title = "心脏病";
      this.getHtml('./assets/html/xzbgaishu.html',1);
      this.getHtml('./assets/html/xzbbingyin.html',2);
      this.getHtml('./assets/html/xzbzhengzhuang.html',3);
      this.getHtml('./assets/html/xzbzhenduan.html',4);
      this.getHtml('./assets/html/xzbzhiliao.html',5);
      break;
  
    default:
      break;
  }
  
}


  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  getHtml(url,index){
    let html =this.http.get(url).map ( response => response.text() );
      html.subscribe(res=>{
        switch (index) {
          case 1:
            this.content1 = res;
            break;
          case 2:
            this.content2 = res;
            break;
          case 3:
            this.content3 = res;
            break;
          case 4:
            this.content4 = res;
            break;
          case 5:
            this.content5 = res;
            break;
        
          default:
            break;
        }
      });
  }
}
