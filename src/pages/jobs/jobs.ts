import { ShiftsPage } from './../shifts/shifts';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CampaignService, JobItem, CampaignItem } from '../../providers/campaign-service';

/*
  Generated class for the Campaigns page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-jobs',
    templateUrl: 'jobs.html'
})
export class JobsPage implements OnInit {
    jobs:JobItem[] = [];
    errorMessage: string;
    loading: boolean = true;
    hasError: boolean = false;
    campaign: CampaignItem = null;

    constructor(private navCtrl: NavController, private navParams: NavParams, private campaignService: CampaignService) {
        
    }

    public ngOnInit() {
        this.campaign = this.navParams.get('campaign');
        console.log(`campaignId for jobs: ${this.campaign.campaignId}`);
        this.campaignService.getJobs(this.campaign.campaignId).subscribe(data => {
                this.jobs = data;
                this.loading = false;
            }, error => {
                this.hasError = true;
                this.errorMessage = <any>error;
            });
    }

    public getShifts(job: JobItem): void {
        console.log('getShiftsEvent');
        console.log(`job: ${JSON.stringify(job)}`);
        console.log(`campaign: ${JSON.stringify(this.campaign)}`);
        this.navCtrl.push(ShiftsPage, {
            job: job,
            campaign: this.campaign
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JobsPage');
    }
}
