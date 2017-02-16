import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  public content: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage) {}
  
  ngOnInit(){
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
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
