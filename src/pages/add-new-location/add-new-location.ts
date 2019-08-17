import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import { PersonalInfoPage } from '../personal-info/personal-info';

/**
 * Generated class for the AddNewLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-new-location',
  templateUrl: 'add-new-location.html',
})

export class AddNewLocationPage {
  location_count:Number=0;
  locationText='';
  doItLater='';
  count='';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.count=localStorage.getItem('count');
    console.log(this.count);
  }
  AddLocation(){
    let options= 
   {animate: true, 
    animation: 'ios-transition', 
        duration: 1000, 
    direction: 'left'};
    localStorage.setItem('count','2');
    this.count="2";
   this.navCtrl.push(MapPage,{parent:1},options)
  }
  ionViewDidLoad() {
    this.location_count=JSON.parse(localStorage.getItem('locations')).length;
    setTimeout(()=>{
      this.locationText='Add another location'
    },(2000));
    setTimeout(()=>{
      this.doItLater="I'll do it later";
    },3000);
  }
  NextPage(){
    let options= 
    {animate: true, 
     animation: 'ios-transition', 
         duration: 1000, 
     direction: 'left'};
     this.navCtrl.setRoot(PersonalInfoPage,null,options)
  }
  Animation(type){
    let count=localStorage.getItem('count');
    if(count=='0'){
    let locations=[]=JSON.parse(localStorage.getItem('locations'));
    console.log(locations)
     

    if(this.locationText.length>0)
    {
      if(type==2){
      
          return {'flipInX':true}
      }
    
    }
    if(type==3){
      if(this.doItLater.length>0 ){
       
        
          return {'fadeInUp':true}
        }    
    }
  }
   
  }
  lightSpeedIn(){
    let count=localStorage.getItem('count');
    if(count=='0'){
      if(this.locationText.length==0){
        return {'lightSpeedIn':true}
      }
    }
 
  }
}
