import { CampaignItem, CampaignService, JobItem } from './../../providers/campaign-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  private ID_PARAM = 'event-id';
  public campaign: CampaignItem;
  public jobs: JobItem[];
  public loadingJobs = true;
  public loadingCampaign = true;
  public hasError = false;
  public errorMessage: string;

  constructor(private route: ActivatedRoute, private campaignService: CampaignService) { }

  ngOnInit() {
    const campaignId = this.route.snapshot.params[this.ID_PARAM];
    this.campaignService.getCampaignById(campaignId).subscribe((c) => {
      this.campaign = c;
      this.loadingCampaign = false;
    }, (error) => {
      this.hasError = true;
      this.loadingCampaign = false;
      this.errorMessage = error as any;
    });

    this.campaignService.getJobs(campaignId).subscribe(job => {
      this.jobs = job;
      this.loadingJobs = false;
    }, error => {
      this.hasError = true;
      this.loadingJobs = false;
      this.errorMessage = error as any;
    });
  }

}
