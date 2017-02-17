import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  
  healthTab: string = "file";
  addHealthData: string = "temp";
  timeStarts: string = "07:43";

  constructor(public navCtrl: NavController) {

  }

}
