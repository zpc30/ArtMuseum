import { MuseumLocation } from "./location.model";


export class Exibition {
    _id: number;
    title: string;
    description: string;
    location: MuseumLocation;

    constructor(obj?:any) {
        this._id = obj && obj._id || 0;
        this.title = obj && obj.title || '';
        this.description = obj && obj.description || '';
        this.location = obj && new MuseumLocation(obj.location) || new MuseumLocation();
    }
}