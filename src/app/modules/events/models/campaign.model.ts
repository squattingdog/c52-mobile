import { ICampaignModel } from './interfaces/campaign.model';

export class CampaignModel implements ICampaignModel {

    constructor(public mid: string,
                public name: string,
                public description: string,
                public logoUrl: string,
                public campaignId: string) {
    }
}

Object.seal(CampaignModel);
