import express, { Express } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import getStations from './routes/stations';

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;
const MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/bike-sharing';

const init = async (): Promise<void> => {
    try {
        dotenv.config();
        app.use(express.json());
        app.use(getStations);
        await mongoose.connect(MONGODB_URI);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        throw error;
    }
}

init();
