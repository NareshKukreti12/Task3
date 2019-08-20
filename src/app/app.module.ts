import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ServicesDataProvider } from '../providers/services-data/services-data';
import { Page2Page } from '../pages/page2/page2';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Page3Page } from '../pages/page3/page3';
import { Page4Page } from '../pages/page4/page4';
import { MapPage } from '../pages/map/map';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { AddNewLocationPage } from '../pages/add-new-location/add-new-location';
import { PersonalInfoPage } from '../pages/personal-info/personal-info';
import { ContactInfoPage } from '../pages/contact-info/contact-info';
import { PasswordPage } from '../pages/password/password';
import { ThankyouPage } from '../pages/thankyou/thankyou';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { ImagePicker } from '@ionic-native/image-picker';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Page2Page,
    Page3Page,
    Page4Page,
    MapPage,
    AddNewLocationPage,
    PersonalInfoPage,
    ContactInfoPage,
    PasswordPage,
    ThankyouPage
  ],
  imports: [
    BrowserModule,
    AutoCompleteModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule,
    HttpModule,
    HttpClientModule,
    PasswordStrengthBarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Page2Page,
    Page3Page,
    Page4Page,
    MapPage,
    AddNewLocationPage,
    PersonalInfoPage,
    ContactInfoPage,
    PasswordPage,
    ThankyouPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesDataProvider,
    ServicesDataProvider,
    NativePageTransitions,
    Geolocation,
    NativeGeocoder,
    GooglePlus,
    Facebook,
    ImagePicker,
    Keyboard,
    LocationAccuracy
  ]
})
export class AppModule {}
