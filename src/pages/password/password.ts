import { Component, NgZone } from '@angular/core';
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
  public account = {
    password: <string>''
  };
  isFocus:boolean=false;
  public barLabel: string = "Password strength:";
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  public strengthLabels = ['', '(Weak)', '(Normal)', '(Good)', '(Strong!)'];
  constructor(public navCtrl: NavController, public navParams: NavParams,public ngZone:NgZone) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }
  strengthChanged(strength: number) {
    if(this.account.password!=null){
      
      this.ngZone.run(()=>{
        this.password=this.account.password;
        console.log(this.password.length);
      })
     
    }
    
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
  checkFocus(event){
    this.isFocus=true;
  }
  FocusRemoved(){
    this.isFocus=false;
  }
  slideUp(){
    if(this.isFocus==true){
      return {'slideTop':true}
    }
    else{
      return {'slideBottom':true}
    }
  }
}
