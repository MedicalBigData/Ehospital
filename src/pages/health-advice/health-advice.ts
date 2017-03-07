import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyData } from '../../providers/my-data';
/*
  Generated class for the HealthAdvice page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-health-advice',
  templateUrl: 'health-advice.html',
  providers: [ MyData ]
})
export class HealthAdvicePage implements OnInit{
  public advice =[];
  constructor(public navCtrl: NavController, public httpData: MyData, public navParams: NavParams, public storage: Storage) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HealthAdvicePage');
  }

  ngOnInit(){
    //console.log(this.advice);
    this.storage.get('userInfo').then(
      userinfo => {
        let url = "/api/";
        let data = "str=<Request> <Date></Date>   <CardNO>"+userinfo.UserNO+"</CardNO> </Request>";
        this.httpData.connect(url+'HealthAdviceSearchByDate',data).subscribe(
          res => {

              this.advice = res.HealthAdviceSearchByDate;

          }
        );
      });
  }

}
