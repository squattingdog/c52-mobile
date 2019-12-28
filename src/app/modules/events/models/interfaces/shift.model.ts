import { LocationModel } from '../location.model';

export interface IShiftModel {
    name: string;
    shiftId: string;
    jobId: string;
    description: string;
    startDateTime: Date;
    endDateTime: Date;
    duration: number;
    active: boolean;
    numberOfVolunteersStillNeeded: number;
    desiredNumberOfVolunteers: number;
    totalVolunteers: number;
    location: LocationModel;
}
