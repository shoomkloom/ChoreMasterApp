export class Group {
    _id: string;
    name: string;
    imageUrl: string;
    masterId: string;
    slaveIds: [{typeslaveId: String}];
    createdDate: Date;
    updatedDate: Date;
}