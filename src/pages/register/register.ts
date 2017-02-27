import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { MyData } from '../../providers/my-data';
import { LoginPage } from '../../pages/login/login';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [ MyData ]
})
export class RegisterPage {

  private register: FormGroup;

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private http: MyData,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
    ) {

     this.register = this.formBuilder.group({
      name: ['', [Validators.required,Validators.minLength(6)]],
      pw1: ['', Validators.required],
      pw2: ['', this.pwValidator.bind(this)],
      accepted: [false,this.acceptedValidator.bind(this)]
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  onSubmit(){
    let loader = this.presentLoading();
    let url = '/api/';
    let data = 'str=' + `
    <Request> 
      <UserMobile>` +this.register.value.name + `</UserMobile>  
      <UserPWD>` +this.register.value.pw1 + `</UserPWD>  
      <UserName>155</UserName>
      <Password>20170222</Password>
      <UserNO></UserNO>
      <RealName></RealName>
      <UserSex></UserSex>
      <ClientID></ClientID>
    </Request>`;
    this.http.connect(url+'UserRegister',data).subscribe(
      res => {
        res.UserRegister.forEach(element => {
          loader.dismissAll();
          if ( element.UserID !==undefined ) {
            this.navCtrl.push(LoginPage);
          } else {
            this.showToast(element.MessageContent);
          }
        });
        
        
      }
    );
  }

  acceptedValidator(control: FormControl): {[key: string]: boolean} {
    if(control.value === false){
      return {'invalid accepted': true};
    }
  }
  pwValidator(control: FormControl): {[key: string]: boolean} {
    let pw1 = this.register?this.register.value.pw1:null;
    if(control.value !== pw1 || control.value === null){
      return {'invalid password': true};
    }
  }

  goBack(){
    this.navCtrl.pop();
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
