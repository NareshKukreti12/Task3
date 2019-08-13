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
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Page2Page,
    Page3Page,
    Page4Page,
    MapPage
  ],
  imports: [
    BrowserModule,
    AutoCompleteModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule,
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Page2Page,
    Page3Page,
    Page4Page,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesDataProvider,
    ServicesDataProvider,
    NativePageTransitions,
    Geolocation,
    NativeGeocoder
  ]
})
export class AppModule {}
