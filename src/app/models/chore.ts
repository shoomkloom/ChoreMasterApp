export class Chore {
    _id: number;
    choreTemplateId: number;
    name: string;
    imageUrl: string;
    details: string;
    masterId: number;
    slaveId: number;
    scheduledDates: { 
        nextDate: Date;
        pastDates: Array<Date>;
        everyDay: Boolean;
        everyWeek: Boolean;
        everyMonth: Boolean;
        everyYear: Boolean;
        repititions: Number;
    }
    comment: string;
    createdDate: Date;
    updatedDate: Date;
}