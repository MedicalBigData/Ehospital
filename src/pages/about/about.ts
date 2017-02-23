import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  items = [
    {'icon':'pin','name':'个人信息完善','url':''},
    {'icon':'pin','name':'个人密码修改','url':''},
    {'icon':'pin','name':'我的预约','url':''}
    ];
  userInfo: any;
  constructor(public navCtrl: NavController,public storage: Storage) {
    this.storage.get('userInfo').then(
      res =>{console.log(res); this.userInfo = res}
    );
  }
  itemSelected(url){
    console.log(url);
  }
}
