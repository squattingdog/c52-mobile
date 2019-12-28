import { LocationModel } from '../location.model';

export interface IJobModel {
    jobId: string;
    name: string;
    description: string;
    skills: string;
    ongoing: boolean;
    numberOfVolunteersStillNeeded: number;
    nubmerOfShifts: number;
    active: boolean;
    location: LocationModel;
    campaignId: string;
    displayOnWebsite: boolean;
}
