import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PasswordPage } from '../password/password';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { ThankyouPage } from '../thankyou/thankyou';
/**
 * Generated class for the ContactInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-info',
  templateUrl: 'contact-info.html',
})
export class ContactInfoPage {
  email:string='';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public googlePlus: GooglePlus,private fb: Facebook) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactInfoPage');
  }
  Slide(){
   // console.log(this.ValidateEmail())
     if(this.ValidateEmail()==true){
      return {'fadeInDown':true}
     }
  }
  ValidateEmail() 
  {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))
    {
      return (true)
    }
    
      return (false)
  }
  NextPage(){
    let pinfo=[]=JSON.parse(localStorage.getItem('personal_info'));
    console.log(pinfo)
    let obj={
      name:pinfo.name,
      position:pinfo.position,
      email:this.email

    }
    localStorage.setItem('personal_info',JSON.stringify(obj));
    let options=
    {animate: true, 
     animation: 'ios-transition', 
         duration: 1000, 
     direction: 'left'};
     this.navCtrl.setRoot(PasswordPage,null,options)
  }
  SocialLogin(type){
    if(type==1){
    this.googlePlus.login({
      'webClientId': '1028232254978-dmcjaad24f0erik2mbj5evvn0pdim0r1.apps.googleusercontent.com'
    }).then((res) => {
      this.SaveEmail(res.email);
    }, (err) => {
        console.log("Error", err);
    });
    }
    else{
      this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res);
        this.getUserDetail(res.authResponse.userID)
      })
      .catch(e => console.log('Error logging into Facebook', e));
    }
  }
  getUserDetail(userid) {
    
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender,photos{images}",["public_profile","user_photos"])
      .then(res => {
           
          //  this.userProfile=res;
            console.log(res)
            let email="";
            if(res.email){
              email=res.email;
            }
            else{
              email='';
            }
            this.SaveEmail(email);
         // this.imageurl=this.userProfile.picture.data.url;
          //console.log(this.imageurl);
          // this.showPrompt(this.userProfile.displayName,email,this.imageurl);
          //this.SocialLogin(this.userProfile.name,email,this.imageurl,2);
       
      })
      .catch(e => {
        console.log(e);
      });
  }
  SaveEmail(email){
    let pinfo=[]=JSON.parse(localStorage.getItem('personal_info'));
    console.log(pinfo)
    let obj={
      name:pinfo.name,
      position:pinfo.position,
      email:email

    }
    localStorage.setItem('personal_info',JSON.stringify(obj));
    let options=
    {animate: true, 
     animation: 'ios-transition', 
         duration: 1000, 
     direction: 'left'};
     this.navCtrl.setRoot(ThankyouPage,null,options)
  }
}
