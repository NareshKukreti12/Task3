import { Component } from '@angular/core';
import { Platform, NavController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Page3Page } from '../pages/page3/page3';
import { Page4Page } from '../pages/page4/page4';
import { MapPage } from '../pages/map/map';
import { AddNewLocationPage } from '../pages/add-new-location/add-new-location';
import { PersonalInfoPage } from '../pages/personal-info/personal-info';
import { ContactInfoPage } from '../pages/contact-info/contact-info';
import { Page2Page } from '../pages/page2/page2';
import { ThankyouPage } from '../pages/thankyou/thankyou';
import { PasswordPage } from '../pages/password/password';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
  public app:App) {
      
     if(localStorage.getItem('business')==null){
      this.rootPage=HomePage;
     }
     else {
        let items=[]=JSON.parse(localStorage.getItem('business'));
        if(items[0]["business_details"].name==null){
          this.rootPage=HomePage;
        }
        else {
          if(items[0]["business_details"].name!=null && localStorage.getItem('phone_number')==null){
            this.rootPage=Page3Page;
          }
          else if(localStorage.getItem('phone_number')!=null && localStorage.getItem('locations')==null && localStorage.getItem('is_address')==null){
            this.rootPage=MapPage
          }
          else if(localStorage.getItem('locations')!=null && localStorage.getItem('personal_info')==null)
          {
            
            this.rootPage=AddNewLocationPage
          }
          else if(localStorage.getItem('personal_info')==null && localStorage.getItem('is_address')!=null){
            this.rootPage=PersonalInfoPage;
          }
          else if(localStorage.getItem('personal_info')!=null && JSON.parse(localStorage.getItem('personal_info')).email==null){
            this.rootPage=ContactInfoPage
          }
          else if(JSON.parse(localStorage.getItem('personal_info')).email!=null && localStorage.getItem('password')==null){
            this.rootPage=PasswordPage;
          }
          else {
            this.rootPage=ThankyouPage;
          }
        }
       
     }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

}

