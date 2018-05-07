import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { CampaignService, CampaignItem } from '../../providers/campaign-service';

/*
  Generated class for the Campaigns page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-campaigns',
    templateUrl: 'campaigns.html'
})
export class CampaignsPage {
    campaigns:CampaignItem[] = [];
    errorMessage: string;
    loading: boolean = true;
    hasError: boolean = false;

    constructor(public navCtrl: NavController, public campaignService: CampaignService) {
        this.campaignService.getCampaigns().subscribe(data => {
                this.campaigns = data;
                this.loading = false;
            }, error => {
                this.hasError = true;
                this.errorMessage = <any>error;
            });
    }

    public getJobs(campaignId: string): void {
        //TODO: navigate to jobs page passing campaignId.
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CampaignsPage');
    }
}
