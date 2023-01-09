

export class MuseumLocation {
    _id: number;
    site: string;
    room: string;
    description: string;

    constructor(obj?:any) {
        this._id = obj && obj._id || [];
        this.site = obj && obj.site || [];
        this.room = obj && obj.room || [];
        this.description = obj && obj.description || [];
    }
}