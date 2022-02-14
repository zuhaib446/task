import { Router } from 'express'
import { getStations, storeDataToDB, getStationsAt } from '../controllers/stations'

const router: Router = Router()

router.get('/api/v1/getStations', getStations) // test route
router.post('/api/v1/indego-data-fetch-and-store-it-db', storeDataToDB)
router.get('/api/v1/stations/:at', getStationsAt)


export default router