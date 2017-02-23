import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { MyData } from '../../providers/my-data';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../../pages/register/register';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ MyData ]
})
export class LoginPage {

  private login: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private http: MyData,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private storage: Storage
    ) {
        this.login = this.formBuilder.group({
        name: ['', [Validators.required,Validators.minLength(6)]],
        password: ['', Validators.required],
        remember: [false]
      });
      this.storage.get('userInfo').then(
        res => {
          if (res!=null) {
            this.navCtrl.push(TabsPage);
          }
      }
      );
      
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  goRegister(){
    this.navCtrl.push(RegisterPage);
  }

  onSubmit(){
    let loader = this.presentLoading();
    let url = '/api/';
    let data = 'str=' + `
    <Request> 
      <UserMobile>` + this.login.value.name + `</UserMobile>  
      <UserPWD>`+ this.login.value.password +`</UserPWD>  
      <UserName></UserName>
      <Password>20170222</Password>  
      <ClientID/>
    </Request>`;
    this.http.connect(url+'UserLogin',data).subscribe(
      res => {
        res.UserLogin.forEach(element => {
          loader.dismissAll();
          if ( element.UserID !==undefined ) {
            this.storage.set('userInfo',element);
            this.navCtrl.push(TabsPage);
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
      duration: 3000
    });
    loader.present();
    return loader;
  }
}
