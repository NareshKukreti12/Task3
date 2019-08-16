import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThankyouPage } from '../thankyou/thankyou';

/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {
  password='';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }
  Slide(){
    if(this.password.length>=8){
      return {'fadeInDown':true}
    }
  }
  NextPage(){
    localStorage.setItem('password',this.password);
    let options= 
      {animate: true, 
       animation: 'ios-transition', 
           duration: 1000, 
       direction: 'left'};
       this.navCtrl.setRoot(ThankyouPage,null,options);
  }
}
