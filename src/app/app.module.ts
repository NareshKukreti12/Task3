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
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Page2Page
  ],
  imports: [
    BrowserModule,
    AutoCompleteModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Page2Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesDataProvider,
    ServicesDataProvider,
    NativePageTransitions
  ]
})
export class AppModule {}
