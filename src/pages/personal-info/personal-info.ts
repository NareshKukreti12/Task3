import { Component, SystemJsNgModuleLoader, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';
import { ContactInfoPage } from '../contact-info/contact-info';

/**
 * Generated class for the PersonalInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-info',
  templateUrl: 'personal-info.html',
})
export class PersonalInfoPage {
  value;
  name='';
  position='';
  checked:boolean=false;
  address='';
  logo:any='https://abeon-hosting.com/images/image-placeholder-png-8.png';
  constructor(public navCtrl: NavController, public navParams: NavParams,public ngZone:NgZone) {
  }

  ionViewDidLoad() {
    this.value=JSON.parse(localStorage.getItem('business'))[0]["business_details"].name;
    console.log('ionViewDidLoad PersonalInfoPage');
    this.logo=JSON.parse(localStorage.getItem('business'))[0].business_details.logos.thumbnail_url;
    console.log(this.logo);
    if(this.logo==null){
      this.logo='https://abeon-hosting.com/images/image-placeholder-png-8.png';
    }
    console.log("Here..");
    if(localStorage.getItem('address2')!=null){
       this.address=localStorage.getItem('address2');
    }
    else{
      this.ngZone.run(()=>{
        this.address=JSON.parse(localStorage.getItem('locations'))[0]["address"];
     
     
        console.log(this.address);
      })
      
    }
  }
  datachanged(event){
    this.checked=true;
  }
 Slide(){
   if(this.name.length>0 && this.position.length>0 ){
     return {'fadeInDown':true}
   }
 }
 NextPage(){
   let obj={
     name:this.name,
     position:this.position
   }
   localStorage.setItem('personal_info',JSON.stringify(obj));
  let options= 
  {animate: true, 
   animation: 'ios-transition', 
       duration: 1000, 
   direction: 'left'};
   this.navCtrl.setRoot(ContactInfoPage,null,options);
 }
}
