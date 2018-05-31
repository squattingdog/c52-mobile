import { CampaignsPage } from './../campaigns/campaigns';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OAuthProvidersListPage } from '../oauth/list/oauth-providers.list.page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  onViewEventsClick() {
    this.navCtrl.push(CampaignsPage);
  }

}
