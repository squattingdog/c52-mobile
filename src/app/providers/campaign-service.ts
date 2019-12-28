import { CampaignModel } from '../modules/events/models/campaign.model';
import { JobModel } from './../modules/events/models/job.model';
import { ShiftModel } from './../modules/events/models/shift.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as moment from 'moment';

/*
  Generated class for the CampaignService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CampaignService {
    private campaigns: CampaignItem[];
    private shiftsMap: Map<string, ShiftItem[]>;
    private jobsMap: Map<string, JobItem[]>;
    private baseUrl = 'https://c52-node-dev.herokuapp.com';
    // private baseUrl = "http://localhost:5000";
    // private config: Config;

    constructor(private http: HttpClient) {
        this.campaigns = new Array<CampaignItem>();
        this.jobsMap = new Map<string, JobItem[]>();
        this.shiftsMap = new Map<string, ShiftItem[]>();
    }

    public getCampaigns(): Observable<CampaignItem[]> {
        if (this.campaigns.length > 0) {
            return of(this.campaigns.slice());
        } else {
            return this.http.get(`${this.baseUrl}/api/v1/campaigns`).pipe(
                map(
                    res => {
                        for (const obj of res as Array<CampaignModel>) {
                            const campaign = new CampaignItem(obj.name, obj.description, obj.logoUrl, obj.campaignId, obj.mid);
                            this.campaigns.push(campaign);
                        }
                        return this.campaigns;
                    },
                    catchError(this.handleError)
                )
            );
        }
    }
    public getCampaignById(id: string): Observable<CampaignItem> {
        return of(this.campaigns.length > 0 ? this.campaigns.find(c => c.campaignId === id) : null);
    }

    public getJobs(campaignId: string): Observable<JobItem[]> {
        if (this.jobsMap.has(campaignId)) {
            return of(this.jobsMap.get(campaignId));
        } else {
            return this.http.get(`${this.baseUrl}/api/v1/campaign/${campaignId}/jobs`).pipe(
                map(
                    (res) => {
                        const jobs: JobItem[] = [];
                        for (const obj of res as Array<JobModel>) {
                            jobs.push(new JobItem(obj));
                        }
                        this.jobsMap.has(campaignId) ? this.jobsMap[campaignId] = jobs : this.jobsMap.set(campaignId, jobs);
                        return jobs;
                    },
                    catchError(this.handleError)
                )
            );
        }
    }

    public getJobById(jobId: string, campaignId: string): Observable<JobItem> {
        return of(this.jobsMap.size > 0 ? this.jobsMap.get(campaignId).find(j => j.jobId === jobId) : null);
    }

    public getShifts(campaignId: string, jobId: string): Observable<ShiftItem[]> {
        if (this.shiftsMap.has(jobId)) {
            return of(this.shiftsMap.get(jobId));
        } else {
            return this.http.get(`${this.baseUrl}/api/v1/campaign/${campaignId}/job/${jobId}/shifts/`).pipe(
                map(
                    (res) => {
                        const shifts: ShiftItem[] = [];

                        for (const shift of res as Array<ShiftModel>) {
                            const item: ShiftItem = new ShiftItem(shift);
                            item.displayStartDate = moment(item.startDateTime).format('MMMM Do YYYY');
                            item.displayEndDate = moment(item.endDateTime).format('MMMM Do YYYY');
                            item.displayStartTime = moment(item.startDateTime).format('h:mm a');
                            item.displayEndTime = moment(item.endDateTime).format('h:mm a');
                            shifts.push(item);
                        }
                        this.shiftsMap.has(jobId) ? this.shiftsMap[jobId] = shifts : this.shiftsMap.set(jobId, shifts);

                        return shifts;
                    },
                    catchError(this.handleError)
                )
            );
        }
    }

    public getShiftById(shiftId: string, jobId: string): Observable<ShiftItem> {
        return of(this.shiftsMap.size > 0 ? this.shiftsMap.get(jobId).find((s: ShiftItem) => s.shiftId === shiftId) : null);
    }

    public volunteerForShift(campaign: CampaignItem, job: JobItem, shift: ShiftItem, registrantId: string): Observable<any> {
        const uri = `${this.baseUrl}/api/v1/campaign/${campaign.campaignId}/job/${job.jobId}/shift/${shift.shiftId}/volunteer`;
        const body = {
            startDateTime: shift.startDateTime,
            contactId: registrantId
        };
        return this.http.post(uri, body).pipe(
            map(
                res => {
                    const objectRes: any = res;
                    return objectRes;
                },
                catchError(this.handleError)
            )
        );
    }

    public groupBy(list: Array<ShiftItem>, keyGetter: any): Map<string, ShiftItem[]> {
        const shiftMap = new Map<string, ShiftItem[]>();
        list.forEach((item) => {
            const key = keyGetter(item);
            if (shiftMap.has(key)) {
                shiftMap.get(key).push(item);
            } else {
                shiftMap.set(key, new Array<ShiftItem>(item));
            }
        });
        return shiftMap;
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const err = error || '';
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
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
    public location: LocationItem;
    public campaignId: string;
    public displayOnWebsite: boolean;

    constructor(job: JobModel) {
        this.jobId = job.jobId;
        this.name = job.name;
        this.description = job.description;
        this.skills = job.skills;
        this.ongoing = job.ongoing;
        this.numberOfVolunteersStillNeeded = job.numberOfVolunteersStillNeeded;
        this.numberOfShifts = job.nubmerOfShifts;
        this.active = job.active;
        this.campaignId = job.campaignId;
        this.displayOnWebsite = job.displayOnWebsite;
        this.location = new LocationItem(job.location.zip,
                                         job.location.street,
                                         job.location.state,
                                         job.location.informataion,
                                         job.location.geocode,
                                         job.location.city);
    }
}

export class ShiftItem {
    public name: string;
    public shiftId: string;
    public jobId: string;
    public active: boolean;
    public location: LocationItem;
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

    constructor(shift: ShiftModel) {
        this.name = shift.name;
        this.shiftId = shift.shiftId;
        this.jobId = shift.jobId;
        this.active = shift.active;
        this.endDateTime = shift.endDateTime;
        this.startDateTime = shift.startDateTime;
        this.numberOfVolunteersStillNeeded = shift.numberOfVolunteersStillNeeded;
        this.desiredNumberOfVolunteers = shift.desiredNumberOfVolunteers;
        this.totalVolunteers = shift.totalVolunteers;
        this.duration = shift.duration;
        this.description = shift.description;
        this.location = new LocationItem(shift.location.zip,
                                         shift.location.street,
                                         shift.location.state,
                                         shift.location.informataion,
                                         shift.location.geocode,
                                         shift.location.city);
    }
}

export class LocationItem {
    zip: string;
    street: string;
    state: string;
    information: string;
    geocode: number;
    city: string;

    constructor(theZip: string, theStreet: string, theState: string, theInfo: string, theGeo: number, theCity: string) {
        this.zip = theZip;
        this.street = theStreet;
        this.state = theState;
        this.information = theInfo;
        this.geocode = theGeo;
        this.city = theCity;
    }
}
