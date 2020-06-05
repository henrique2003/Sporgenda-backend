import { Router } from 'express'
import ScheduleController from './controllers/ScheduleController'

const { index, store, registerPeople, show, destroy } = ScheduleController
const routes = Router()

routes.post('/agenda', store)
routes.get('/agenda', index)
routes.get('/agenda/:id', show)
routes.put('/agenda/:id', registerPeople)
routes.delete('/agenda/:id', destroy)

export default routes
