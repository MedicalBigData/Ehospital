import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  public userFiles=[];
  constructor(
    public navCtrl: NavController,
    public httpData: MyData,
    public storage: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private param: NavParams
   ) {
    this.timeStarts = this.Data.getHours()+":"+this.Data.getMinutes();
    
  }
  ngOnInit(){
    console.log('oninit');
    switch (this.param.get('tab')) {
      case 1:
        this.healthTab = 'file';
        break;
      case 2:
        this.healthTab = 'data';
        break;
    
      default:
        break;
    }
    
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
        +    "</Height>      <BMI>"+
        a/(b*b/10000)
        +    "</BMI>     <MonitorTime>"+
        this.Data.getFullYear()+"-"+(this.Data.getMonth()+1)+"-"+this.Data.getDate()+" "+this.timeStarts
        +"</MonitorTime>  </Request>";

            this.httpData.connect(url+'WeightInsert',InsertData).subscribe(
          res => {
            loader.dismissAll();
            this.getUserFiles();//刷新数据
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
            this.getUserFiles();//刷新数据
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
        +"</BloodSugarValue><Type>1</Type>  <HoursAfterMeal>"+
        b
        +"</HoursAfterMeal> <Type>1</Type> <Fromto>01</Fromto>   <MonitorTime>"+
        this.Data.getFullYear()+"-"+(this.Data.getMonth()+1)+"-"+this.Data.getDate()+" "+this.timeStarts
        +"</MonitorTime>  </Request>";

            this.httpData.connect(url+'BloodSugarInsert',InsertData).subscribe(
          res => {
            loader.dismissAll();
            this.getUserFiles();//刷新数据
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
    //let loader = this.presentLoading();
    this.storage.get('userInfo').then(
      res => {
        this.userInfo = res;
        let url = '/api/';
        let InquiryData = "str=<Request>    <CardNO>"+this.userInfo.UserNO+"</CardNO> </Request>";
        this.httpData.connect(url+'WeightInquiry',InquiryData).subscribe(
          res=>{
            res.WeightInquiry.forEach(element => {
              if (element.MessageCode != '2') {
                this.userFiles.push(element);
              }
            });
            // this.userFiles.concat(res.WeightInquiry);
            // console.log(this.userFiles);
          }
        );
        this.httpData.connect(url+'TemperatureInquiry',InquiryData).subscribe(
          res=>{
            res.TemperatureInquiry.forEach(element => {
              if (element.MessageCode != '2') {
                this.userFiles.push(element);
              }
              
            });
            // this.userFiles.concat(res.TemperatureInquiry);
            // console.log(this.userFiles);
          }
        );
        this.httpData.connect(url+'BloodSugarInquiry',InquiryData).subscribe(
          res=>{
            res.BloodSugarInquiry.forEach(element => {
              
              if (element.MessageCode != '2') {
                this.userFiles.push(element);
              }
            });
            // this.userFiles.concat(res.BloodSugarInquiry) ;
          }
        );
      }
      );
  }
}
