import { Component, OnInit } from '@angular/core';
import { NavParams, ToastController, ToastOptions } from 'ionic-angular';
import { CampaignService, ShiftItem, CampaignItem, JobItem } from '../../providers/campaign-service';
// import { Toast } from '@ionic-native/toast/ngx';

/*
  Generated class for the Campaigns page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-shifts',
    templateUrl: 'shifts.html'
})
export class ShiftsPage implements OnInit {
    shifts:Map<string, ShiftItem[]> = null;
    errorMessage: string;
    loading: boolean = true;
    hasError: boolean = false;
    campaign: CampaignItem = null;
    job: JobItem = null;
    signupMessage = "";    

    constructor(private navParams: NavParams, 
                private campaignService: CampaignService,
                private toast: ToastController) {
        
    }

    public ngOnInit() {
        this.campaign = this.navParams.get('campaign');
        this.job = this.navParams.get('job');
        console.log('shift.ngOnInit()');
        console.log(`campaign: ${JSON.stringify(this.campaign)}`);
        console.log(`job: ${JSON.stringify(this.job)}`);
        this.campaignService.getShifts(this.campaign.campaignId, this.job.jobId).subscribe(data => {
                this.shifts = this.campaignService.groupBy(data, item => item.displayStartDate);
                this.loading = false;
                console.log(`shifts.size: ${this.shifts.size}`);
                console.log(JSON.stringify(this.shifts));
               
               
            }, error => {
                this.hasError = true;
                this.errorMessage = <any>error;
                console.log(`error: ${this.errorMessage}`)
            });
    }

    public getKeys() {
        return Array.from(this.shifts.keys());
    }

    public signUp(shift: ShiftItem): void {
        //TODO: signup for selected shift
        this.campaignService.volunteerForShift(this.campaign, this.job, shift, "0031700000iIoYR").subscribe(data => {
            let message: string;
            if(data.success)  {
                message = "Registration Complete. Thank you!!";
            } else {
                message = "Registration failed.", "5000", "top";
            }
            this.toast.create({
                duration: 2500,
                message: message,
                position: "top"
            }).present(); 
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JobsPage');
    }
}
