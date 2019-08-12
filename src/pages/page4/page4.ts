import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';

/**
 * Generated class for the Page4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-page4',
  templateUrl: 'page4.html',
})
export class Page4Page {
  text:string='';
  slideItems=[];
   index=0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }
 
  ngAfterViewInit(){
    //  this.text="Finding on Map"
    //  this.slideItems.push(
    //    {
    //      title:"Finding on Map"      
    //    },
    //    {
    //     title:"Let see if we are light"      
    //    },
    //    {
    //     title:"Even Columbus is not accounts"      
    //    },
    //    {
    //     title:"Guide me if we did mistake"      
    //    },
    //  )
  }
  ionViewDidLoad() {
    this.text="Finding on Map"
     this.slideItems.push(
       {
         title:"Finding on Map"      
       },
       {
        title:"Let see if we are right"      
       },
       {
        title:"Even Columbus is not accurate"      
       },
       {
        title:"Guide me if we did mistake"      
       },
     )
  }
  ChangeSlide(){
    this.index++
    console.log("Changing",this.index);
    if(this.index==3){
      let options= 
      {animate: true, 
       animation: 'ios-transition', 
           duration: 1000, 
       direction: 'left'};
       setTimeout(()=>{
        this.navCtrl.setRoot(MapPage,null,options);
       },2000)
      
    }
  }
}
