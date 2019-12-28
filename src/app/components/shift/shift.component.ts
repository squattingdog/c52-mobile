import { ShiftItem, CampaignService } from './../../providers/campaign-service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss'],
})
export class ShiftComponent implements OnInit {
  @Input() shift: ShiftItem;

  constructor(private campaignService: CampaignService) { }

  public ngOnInit() { }

  public signup(): void {
    // signup code here
    console.log(`signup for shiftId: ${this.shift.shiftId}, jobId: ${this.shift.jobId}`);
  }
}
