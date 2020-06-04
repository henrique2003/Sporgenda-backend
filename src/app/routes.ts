import { Router } from 'express'
import ScheduleController from './controllers/ScheduleController'

const { index, store, registerPeople } = ScheduleController
const routes = Router()

routes.post('/agenda', store)
routes.get('/agenda', index)
routes.put('/agenda/:id', registerPeople)

export default routes
