import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CommonFuncProvider } from '../providers/common-func/common-func';
import { HttpClientModule } from '@angular/common/http'; 
import { SocialSharing } from "@ionic-native/social-sharing";
import { Network } from "@ionic-native/network";

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonFuncProvider
  ]
})
export class AppModule {}
