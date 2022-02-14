import { Document } from 'mongoose'

export interface IStation extends Document {
    id: number,
    name: string,
    capacity: number,
    bikes: number,
    docks: number
    free_bikes: number;
    longitude: number;
    latitude: number;
}
