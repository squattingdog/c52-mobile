import { JobsPage } from './../jobs/jobs';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
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
export class CampaignsPage implements OnInit {
    campaigns:CampaignItem[] = [];
    errorMessage: string;
    loading: boolean = true;
    hasError: boolean = false;

    constructor(public navCtrl: NavController, public campaignService: CampaignService) {
        
    }
    
    public ngOnInit() {
        this.campaignService.getCampaigns().subscribe(data => {
            this.campaigns = data;
            this.loading = false;
        }, error => {
            this.hasError = true;
            this.errorMessage = <any>error;
        });
    }

    public getJobs(campaign: CampaignItem): void {
        console.log(`navigate to job list for campaignId: ${campaign.campaignId}`);
        //TODO: navigate to jobs page passing campaignId.
        this.navCtrl.push(JobsPage, {
            campaign: campaign
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CampaignsPage');
    }
}
