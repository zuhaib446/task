import { Response, Request } from 'express'
import { IStation } from '../types/stations.dto'
import Station from '../models/station'
import axios from 'axios'
import corn from 'node-cron';

const fetchData = async (url: string) => {
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getStations = async (req: Request, res: Response) => {
    // const data = await fetchData('https://www.rideindego.com/stations/json/)
    const data = await fetchData('https://api.citybik.es/v2/networks/velib')
    res.json(data)
}

export const storeDataToDB = async (req: Request, res: Response) => {
    // every 1 hour
    corn.schedule('0 */1 * * *', async () => {
        const data = await fetchData('https://api.citybik.es/v2/networks/velib')
        const stations = data.network.stations
        const newStations = stations.map((station: IStation) => {
            return {
                id: station.id,
                name: station.name,
                capacity: station.capacity,
                bikes: station.bikes,
                docks: station.docks,
                free_bikes: station.free_bikes,
                longitude: station.longitude,
                latitude: station.latitude
            }
        })
        await Station.insertMany(newStations)
        res.json("Data stored to DB after 1 hour")
    })
}

export const getStationsAt = async (req: Request, res: Response) => {
    const { at } = req.params
    const data = await Station.find({
        time: {
            $gte: new Date(at)
        }
    })
    res.json({
        at,
        stations: data,
        weather: {
            temperature: ''
        }
    })
}
