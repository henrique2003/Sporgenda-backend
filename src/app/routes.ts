import { Router } from 'express'
import ScheduleController from './controllers/ScheduleController'
import UserController from './controllers/UserController'

const { index, store, registerPeople, show, destroy } = ScheduleController
const { post, login } = UserController
const routes = Router()

routes.post('/agenda', store)
routes.get('/agenda', index)
routes.get('/agenda/:id', show)
routes.put('/agenda/:id', registerPeople)
routes.delete('/agenda/:id', destroy)

routes.post('/user', post)
routes.post('/login', login)

export default routes
