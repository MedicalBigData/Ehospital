import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../../pages/register/register';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private login: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder
    ) {
      this.login = this.formBuilder.group({
      name: ['11111111111', [Validators.required,Validators.minLength(6)]],
      password: ['11', Validators.required],
      remember: [false]
    });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  goRegister(){
    this.navCtrl.push(RegisterPage);
  }

  onSubmit(){
    this.navCtrl.push(TabsPage);
  }
}
