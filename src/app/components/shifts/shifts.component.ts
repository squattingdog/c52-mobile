import { ShiftItem, CampaignItem, JobItem, CampaignService } from './../../providers/campaign-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss'],
})
export class ShiftsComponent implements OnInit {
  public shiftsMap: Map<string, ShiftItem[]>;
  public job: JobItem;
  public event: CampaignItem;
  public loadingEvent = true;
  public loadingJob = true;
  public loadingShifts = true;
  public hasError = false;
  public errorMessage: string;

  constructor(private route: ActivatedRoute,
              private campaignService: CampaignService) { }

  ngOnInit() {
    const campaignId = this.route.snapshot.params['event-id'];
    const jobId = this.route.snapshot.params['job-id'];

    this.campaignService.getCampaignById(campaignId).subscribe(data => {
      this.event = data;
      this.loadingEvent = false;
    }, error => {
      this.hasError = true;
      this.errorMessage = error as any;
    });

    this.campaignService.getJobById(jobId, campaignId).subscribe(data => {
      this.job = data;
      this.loadingJob = false;
    }, error => {
      this.hasError = true;
      this.errorMessage = error as any;
    });

    this.campaignService.getShifts(campaignId, jobId).subscribe(data => {
      this.shiftsMap = this.campaignService.groupBy(data, item => item.displayStartDate);
      this.loadingShifts = false;

    }, error => {
        this.hasError = true;
        this.errorMessage = error as any;
    });
  }

  public getKeys() {
    return Array.from(this.shiftsMap.keys());
  }

}
