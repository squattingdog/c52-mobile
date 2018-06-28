import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { map, catchError } from 'rxjs/operators';

/*
  Generated class for the CampaignService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CampaignService {
    // private config: Config;

    constructor(private http:HttpClient) { }

    public getCampaigns():Observable<CampaignItem[]> {
        console.log('getting campaigns');
        return this.http.get('http://localhost:5000/api/v1/campaigns').pipe(
            map(
                this.extractCampaignData,
                catchError(this.handleError)
            )
        );
    }

    private extractCampaignData (res:  Response): CampaignItem[] {
        console.log(res);
        const objects: any = res;
        const campaigns: CampaignItem[] = [];
        for (let i = 0; i < objects.length; i++) {
            const item = objects[i];
            const campaign = new CampaignItem(item.name, item.description, item.logoUrl, item.campaignId, item.mid);
            campaigns.push(campaign);
        }
        console.log(campaigns);
        return campaigns;
    }

    private handleError(error: Response | any) {
        console.log(error);
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
