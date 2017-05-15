import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MyData } from '../../providers/my-data';
/*
  Generated class for the Oppointment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-oppointment',
  templateUrl: 'oppointment.html',
  providers: [ MyData ]
})
export class OppointmentPage {
  public type=1;
  public hospitals;
  public deperts;
  public doctors;
  public doctorDetail;
  private HospitalID;
  private DepartmentID;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: MyData) {
   this.getHospitals();
  }
  
  getHospitals(){
    let url = '/wxapi/';
    let data = '';
    this.http.connect(url+'HospitalInquiry',data).subscribe(
      res  => {
        if(res.Result[0].MessageCode == 1 && res.Result[0].MessageContent.resultCount>0){
            this.hospitals = res.Result[0].MessageContent.resultDetail.HospitalInquiry;
        }else{
            this.hospitals = false;
        }
                console.log(this.hospitals);
              }
    );
  }
  getDeperts(id){
    this.type = 2;
    this.HospitalID = id;
    let url = '/wxapi/';
    let data = "HospitalID="+this.HospitalID+"&ParentDeprtID=ALL";
    this.http.connect(url+'HospitalDepert',data).subscribe(
      res  => {
        if(res.Result[0].MessageCode == 1 && res.Result[0].MessageContent.resultCount>0){
            this.deperts = res.Result[0].MessageContent.resultDetail.HospitalDeprtInquiry;
            this.deperts.splice(0,1);
        }else{
            this.deperts = false;
        }
        
        console.log(this.deperts);
      }
    );
  } 
  getDoctor(id){
    this.type = 3;
    this.DepartmentID =id;
    let url = '/wxapi/';
    let data = 'HospitalID='+this.HospitalID+'&DepartmentID='+this.DepartmentID+'&DoctorID=';
    this.http.connect(url+'DepertDoctor',data).subscribe(
      res  => {
        if(res.Result[0].MessageCode == 1 && res.Result[0].MessageContent.resultCount>0){
            this.doctors = res.Result[0].MessageContent.resultDetail.HospitalDeprtInquiry;
        }else{
            this.doctors = false;
        }
        
      }
    );
  }

  getDoctorDetail(id){
    console.log(id);
    this.type = 4;
    this.doctorDetail = this.doctors[id];
  }

  preOrder(){
    alert('系统正在升级，暂时无法预约！');
    }

}
