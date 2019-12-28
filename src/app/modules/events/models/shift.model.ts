import { LocationModel } from './location.model';
import { IShiftModel } from './interfaces/shift.model';

export class ShiftModel implements IShiftModel {

    constructor(public name: string,
                public shiftId: string,
                public jobId: string,
                public description: string,
                public startDateTime: Date,
                public endDateTime: Date,
                public duration: number,
                public active: boolean,
                public numberOfVolunteersStillNeeded: number,
                public desiredNumberOfVolunteers: number,
                public totalVolunteers: number,
                public location: LocationModel) {
    }
}
