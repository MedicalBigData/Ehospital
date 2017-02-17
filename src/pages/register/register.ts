import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  private register: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {

     this.register = this.formBuilder.group({
      name: ['', [Validators.required,Validators.minLength(6)]],
      pw1: ['', Validators.required],
      pw2: ['', Validators.required],
      accepted: [false,this.acceptedValidator.bind(this)]
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  onSubmit(){
    console.log(this.register.value);
  }

  acceptedValidator(control: FormControl): {[key: string]: boolean} {
    if(control.value === false){
      return {'invalid accepted': true};
    }
  }

  goBack(){
    this.navCtrl.pop();
  }
}
