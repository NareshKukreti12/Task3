import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Searchbar } from 'ionic-angular';
import { Page4Page } from '../page4/page4';

/**
 * Generated class for the Page3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html',
})
export class Page3Page {
  phone_number:any='';
  isOtpSent:boolean=false;
  otp:string=''
  @ViewChild('SearchBar') searchbar: Searchbar;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl:AlertController
    
    ) {
  }
  ngAfterViewInit(){
    this.phone_number='';
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Page3Page');
  }
  Animations(type){
    if(type==1){
      if(this.phone_number.length==10){
        return {'fadeInUp':true}
      }
      else{
        return {'fadeInDown':true}
      }
    }
  }
  PhoneNumber(type){

  }
  SendOTP(){
    this.isOtpSent=true;
    
    setTimeout(()=>{
      this.searchbar.setFocus();
      console.log("Here");
      (document.getElementById('txtOtp') as HTMLInputElement).focus();
       
    },1000);
    
  }
  Cancel(){
     this.isOtpSent=false;
  }
  Resend(){
   this.showConfirm("Message","A verification code has been sent to your mobile number!")
  }
  ShowAlert(title,message,type){
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [
        {
        text: 'Ok',
        handler: () => {
          if(type==2){
            let options= 
            {animate: true, 
             animation: 'ios-transition', 
                 duration: 1000, 
             direction: 'left'};
             this.navCtrl.push(Page4Page,null,options);
            localStorage.setItem('phone_number',this.phone_number);
          }
        }
      }]
    });
    alert.present();
  
  }
  showConfirm(title,message) {
    const confirm = this.alertCtrl.create({
      title: 'Message',
      message: 'Do you really want to resend verfication code?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
             this.ShowAlert(title,message,1);
          }
        }
      ]
    });
    confirm.present();
  }
  Verify(){
  
    if(this.otp=="123456"){
      this.ShowAlert("Message","Your mobile number has been verified successfully!",2)
    }
    else{
      this.ShowAlert("Message","Invalid verification code!",1)
    }
  }
}
