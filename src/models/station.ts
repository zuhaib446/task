import { model, Schema } from 'mongoose'
import { IStation } from '../types/stations.dto';

const stationSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    bikes: {
        type: Number,
        required: true
    },
    docks: {
        type: Number,
        required: true
    },
    free_bikes: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export default model<IStation>('Station', stationSchema)