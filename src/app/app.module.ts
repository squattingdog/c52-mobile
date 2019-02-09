

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CampaignsPage } from './../pages/campaigns/campaigns';
import { JobsPage } from '../pages/jobs/jobs';
import { ShiftsPage } from '../pages/shifts/shifts';

import { CampaignService } from './../providers/campaign-service';
import { HttpClientModule } from '@angular/common/http';

import { Toast } from '@ionic-native/toast/ngx';

@NgModule({
  declarations: [
    MyApp
    ,HomePage
    ,CampaignsPage
    ,JobsPage
    ,ShiftsPage
  ]
  ,imports: [
    BrowserModule
    ,HttpClientModule
    ,IonicModule.forRoot(MyApp)
    ,IonicPageModule.forChild(CampaignsPage)
    ,IonicPageModule.forChild(JobsPage)
    ,IonicPageModule.forChild(ShiftsPage)
  ]
  ,bootstrap: [IonicApp]
  ,entryComponents: [
    MyApp
    ,HomePage
    ,JobsPage
    ,ShiftsPage
  ]
  ,providers: [
    StatusBar
    ,SplashScreen
    ,{provide: ErrorHandler, useClass: IonicErrorHandler}
    ,CampaignService
    ,Toast
  ]
})

export class AppModule {}
