import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { MyData } from '../../providers/my-data';
/*
  Generated class for the Improvement page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-improvement',
  templateUrl: 'improvement.html',
  providers: [ MyData ]
})
export class ImprovementPage {

  private implements: FormGroup;

  private userInfo;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private formBuilder: FormBuilder,
    private http: MyData,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private storage: Storage
    ) {
    this.implements = this.formBuilder.group({
      realName:['',Validators.required],
      cardID:['',Validators.required],
      sex:['',Validators.required],
      age:['',Validators.required]
    });

    this.storage.get('userInfo').then(
      res =>{ this.userInfo = res}
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImprovementPage');
  }

  onSubmit(){
    console.log("onSubmit");
    let loader = this.presentLoading();
    
    let url = '/api/';
    let data = 'str=' + `
    <Request> 
      <UserID>`+this.userInfo.UserID+`</UserID>
      <UserMobile>`+this.userInfo.Mobile+`</UserMobile>  
      <UserName>155</UserName>
      <UserNO>` +this.implements.value.cardID + `</UserNO>
      <RealName>` +this.implements.value.realName + `</RealName>
      <UserSex>` +this.implements.value.sex + `</UserSex>
      <UserAge>` +this.implements.value.age + `</UserAge>
      <ClientID></ClientID>
    </Request>`;
    this.http.connect(url+'UserInfoChange',data).subscribe(
      res => {
        loader.dismissAll();
        res.UserInfoChange.forEach(element => {
          
          if ( element.MessageCode === "0" ) {
            this.showToast(element.MessageContent);
            this.userInfo.UserAge = this.implements.value.age;
            this.userInfo.UserNO = this.implements.value.cardID;
            this.userInfo.RealName = this.implements.value.realName;
            this.userInfo.UserSex = this.implements.value.sex;
            this.storage.set('userInfo',this.userInfo);
            this.navCtrl.pop();
          } else {
            this.showToast(element.MessageContent);
          }
        });
      }
    );
  }

  showToast(message: string) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 2000,
        position: 'top'
      });
      toast.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 30000
    });
    loader.present();
    return loader;
  }
}
