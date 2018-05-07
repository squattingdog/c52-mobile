

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CampaignsPage } from './../pages/campaigns/campaigns';

import { CampaignService } from './../providers/campaign-service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp
    ,HomePage
    ,CampaignsPage
  ]
  ,imports: [
    BrowserModule
    ,HttpClientModule
    ,IonicModule.forRoot(MyApp)
    ,IonicPageModule.forChild(CampaignsPage)
  ]
  ,bootstrap: [IonicApp]
  ,entryComponents: [
    MyApp
    ,HomePage
  ]
  ,providers: [
    StatusBar
    ,SplashScreen
    ,{provide: ErrorHandler, useClass: IonicErrorHandler}
    ,CampaignService
  ]
})

export class AppModule {}
