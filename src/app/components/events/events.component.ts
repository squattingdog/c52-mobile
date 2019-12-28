import { CampaignService, CampaignItem } from './../../providers/campaign-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  campaigns: CampaignItem[] = [];
  loading = false;
  hasError = false;
  errorMessage: string;

  constructor(public campaignService: CampaignService) { }

  public ngOnInit() {
    this.campaignService.getCampaigns().subscribe(data => {
        this.campaigns = data;
        this.loading = false;
    }, error => {
        this.hasError = true;
        this.errorMessage = error as any;
    });
  }
}
