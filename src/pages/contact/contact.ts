import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { MyData } from '../../providers/my-data';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [ MyData ]
})
export class ContactPage implements OnInit{
  
  healthTab: string = "file";
  addHealthData: string = "temp";
  timeStarts: string = '';
  Data = new Date() ; // 当前时间
  private userInfo;
  public userFiles;
  constructor(
    public navCtrl: NavController,
    public httpData: MyData,
    public storage: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
   ) {
    this.timeStarts = this.Data.getHours()+":"+this.Data.getMinutes();
    
  }
  ngOnInit(){
    this.storage.get('userInfo').then(
      res => {

      }
      );
  }
  //体重录入
  saveFat(a,b){
    let loader = this.presentLoading();
    this.storage.get('userInfo').then(
      res => {
        this.userInfo = res;
        console.log(this.userInfo);
        let url = '/api/';
        let InsertData = "str="+
        "<Request>    <UserID>"+
        this.userInfo.UserID
        +"</UserID>  <CardNO>"+
        this.userInfo.UserNO
        +"</CardNO>   <Weight>"+
        a
        +"</Weight>     <Height>"+
        b
        +    "</Height>     <MonitorTime>"+
        this.Data.getFullYear()+"-"+(this.Data.getMonth()+1)+"-"+this.Data.getDate()+" "+this.timeStarts
        +"</MonitorTime>  </Request>";

            this.httpData.connect(url+'WeightInsert',InsertData).subscribe(
          res => {
            loader.dismissAll();
            this.showToast(res.WeightInsert[0].MessageContent);
            if (res.WeightInsert[0].MessageCode === '0') {
                this.healthTab = "file";
            }       
          }
        );
      }
    );
  }
  //体温录入
    saveTemp(a){
    let loader = this.presentLoading();
    this.storage.get('userInfo').then(
      res => {
        this.userInfo = res;
        console.log(this.userInfo);
        let url = '/api/';
        let InsertData = "str="+
        "<Request>    <UserID>"+
        this.userInfo.UserID
        +"</UserID>  <CardNO>"+
        this.userInfo.UserNO
        +"</CardNO>   <Value>"+
        a
        +"</Value>   <MonitorTime>"+
        this.Data.getFullYear()+"-"+(this.Data.getMonth()+1)+"-"+this.Data.getDate()+" "+this.timeStarts
        +"</MonitorTime>  </Request>";

            this.httpData.connect(url+'TemperatureInsert',InsertData).subscribe(
          res => {
            loader.dismissAll();
            this.showToast(res.TemperatureInsert[0].MessageContent);
            if (res.TemperatureInsert[0].MessageCode === '0') {
                this.healthTab = "file";
            }       
          }
        );
      }
    );
  }
  //血糖录入
    saveSugar(a,b){
    let loader = this.presentLoading();
    this.storage.get('userInfo').then(
      res => {
        this.userInfo = res;
        console.log(this.userInfo);
        let url = '/api/';
        let InsertData = "str="+
        "<Request>    <UserID>"+
        this.userInfo.UserID
        +"</UserID>  <CardNO>"+
        this.userInfo.UserNO
        +"</CardNO> <BloodSugarValue>"+
        a
        +"</BloodSugarValue> <HoursAfterMeal>"+
        b
        +"</HoursAfterMeal> <Type>1</Type> <Fromto>"+
        this.userInfo.UserID
        +"</Fromto>   <MonitorTime>"+
        this.Data.getFullYear()+"-"+(this.Data.getMonth()+1)+"-"+this.Data.getDate()+" "+this.timeStarts
        +"</MonitorTime>  </Request>";

            this.httpData.connect(url+'BloodSugarInsert',InsertData).subscribe(
          res => {
            loader.dismissAll();
            this.showToast(res.BloodSugarInsert[0].MessageContent);
            if (res.BloodSugarInsert[0].MessageCode === '0') {
                this.healthTab = "file";
            }       
          }
        );
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

  addata(){
    this.healthTab="data";
  }

  getUserFiles(){

  }
}
