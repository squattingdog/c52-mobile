import { CampaignItem } from './../../providers/campaign-service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  @Input() event: CampaignItem;

  constructor() { }

  ngOnInit() {
  }

  public getJobs(campaign: CampaignItem): void {
    console.log(`navigate to job list for campaignId: ${campaign.campaignId}`);
    // TODO: navigate to jobs page passing campaignId.
    /* this.navCtrl.push(JobsPage, {
        campaignId: campaign.campaignId
    });*/
}

}
