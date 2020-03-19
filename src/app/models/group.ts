export class Group {
    _id: string;
    name: string;
    imageUrl: string;
    masterId: string;
    slaveIds: Array<string>;
    createdDate: Date;
    updatedDate: Date;
}