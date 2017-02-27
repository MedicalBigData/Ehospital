import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  
  healthTab: string = "file";
  addHealthData: string = "temp";
  timeStarts: string = '';
  Data = new Date() ; // 当前时间
  constructor(public navCtrl: NavController) {
    this.timeStarts = this.Data.getHours()+":"+this.Data.getMinutes();
  }

}
