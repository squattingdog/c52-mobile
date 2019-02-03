import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { map, catchError } from 'rxjs/operators';
import * as moment from 'moment';

/*
  Generated class for the CampaignService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CampaignService {
    //private config: Config;

    constructor(private http:HttpClient) { }

    public getCampaigns():Observable<CampaignItem[]> {
        console.log('getting campaigns');
        return this.http.get('https://c52-node-dev.herokuapp.com/api/v1/campaigns').pipe(
            map(
                this.extractCampaignData,
                catchError(this.handleError)
            )                
        );
    }

    public getJobs(campaignId: string):Observable<JobItem[]> {
        return this.http.get(`https://c52-node-dev.herokuapp.com/api/v1/campaign/${campaignId}/jobs/`).pipe(
            map(
                this.extractJobData,
                catchError(this.handleError)
            )
        );
    }

    public getShifts(campaignId: string, jobId: string): Observable<ShiftItem[]> {
        return this.http.get(`https://c52-node-dev.herokuapp.com/api/v1/campaign/${campaignId}/jobs/${jobId}/shifts/`).pipe(
            map(
                this.extractShiftData,
                catchError(this.handleError)
            )
        );
    }

    private extractShiftData(res: Response): ShiftItem[] {
        let objects: any = res;
        let shifts: ShiftItem[] = [];
        for(let i = 0; i < objects.length; i++) {
            let item: ShiftItem = <ShiftItem>objects[i];
            item.displayStartDate = moment(item.startDateTime).format('MMMM Do YYYY');
            item.displayEndDate = moment(item.endDateTime).format('MMMM Do YYYY');
            item.displayStartTime = moment(item.startDateTime).format('h:mm a');
            item.displayEndTime = moment(item.endDateTime).format('h:mm a');
            shifts.push(item);
        }
        return shifts;
    }

    private extractJobData (res: Response): JobItem[] {
        let objects:any = res;
        let jobs: JobItem[] = [];
        for(let i = 0; i < objects.length; i++) {
            let item: JobItem = <JobItem>objects[i];            
            jobs.push(item);
        }
        return jobs;
    }

    private extractCampaignData (res:Response): CampaignItem[] {
        console.log(res);
        let objects:any = res;
        let campaigns:CampaignItem[] = [];
        for (let i = 0; i < objects.length; i++) {
            let item = objects[i];
            let campaign = new CampaignItem(item.name, item.description, item.logoUrl, item.campaignId, item.mid);
            campaigns.push(campaign);
        }
        console.log(campaigns);
        return campaigns;
    }

    private handleError(error: Response | any) {
        console.log(error);
        let errMsg: string;
        if(error instanceof Response) {
            const err = error || '';
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }

    public groupBy(list: Array<ShiftItem>, keyGetter: any): Map<string, ShiftItem[]> {
        const map = new Map<string, ShiftItem[]>();
        list.forEach((item) => {
            const key = keyGetter(item);
            if(map.has(key)) {
                map.get(key).push(item);
            } else {
                map.set(key, new Array<ShiftItem>(item));
            }
        });
        return map;
    }
}

export class CampaignItem {
    title: string;
    description: string;
    logoUrl: string;
    campaignId: string;
    id: string;

    constructor(theTitle: string, theDescription: string, theLogoUrl: string, theCampaignId: string, theId: string) {
        this.title = theTitle;
        this.description = theDescription;
        this.logoUrl = theLogoUrl;
        this.campaignId = theCampaignId;
        this.id = theId;
    }
}

export class JobItem {
    public jobId: string;
    public name: string;
    public description: string;
    public skills: string;
    public ongoing: boolean;
    public numberOfVolunteersStillNeeded: number;
    public numberOfShifts: number;
    public active: boolean;
    public location: LocationModel;
    public campaignId: string;
    public displayOnWebsite: boolean;
}

export class ShiftItem {
    public name: string;
    public shiftId: string;
    public jobId: string;
    public active: boolean;
    public location: LocationModel;
    public endDateTime: Date;
    public numberOfVolunteersStillNeeded: number;
    public desiredNumberOfVolunteers: number;
    public totalVolunteers: number;
    public startDateTime: Date;
    public duration: number;
    public description: string;
    public displayStartDate: string;
    public displayEndDate: string;
    public displayStartTime: string;
    public displayEndTime: string;
}

export class LocationModel {
    zip: string;
    street: string;
    state: string;
    information: string;
    geocode: string;
    city: string;

    constructor(theZip: string, theStreet: string, theState: string, theInfo: string, theGeo: string, theCity: string) {
        this.zip = theZip;
        this.street = theStreet;
        this.state = theState;
        this.information = theInfo;
        this.geocode = theGeo;
        this.city = theCity;
    }
}
