import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NavController } from 'ionic-angular';
import { ImprovementPage } from '../improvement/improvement';
 
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  items = [
    {'icon':'pin','name':'个人信息完善','url':1},
    {'icon':'pin','name':'个人密码修改','url':2},
    {'icon':'pin','name':'我的预约','url':3}
    ];
  userInfo: any;
  constructor(public navCtrl: NavController,public storage: Storage) {
    this.storage.get('userInfo').then(
      res =>{console.log(res); this.userInfo = res}
    );
  }
  itemSelected(url){
    switch (url) {
      case 1:
        this.navCtrl.push(ImprovementPage);
        break;
    
      default:
      alert('系统正在升级，该功能暂时无法提供！');
        break;
    }
  }
}
