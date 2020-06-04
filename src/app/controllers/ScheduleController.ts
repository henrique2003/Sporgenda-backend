import { Request, Response } from 'express'
import { Schedule } from '../models'

class ScheduleController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const schedule = await Schedule.find({})

      return res.status(200).json(schedule)
    } catch (error) {
      return res.status(500).json('Server Error')
    }
  }

  public async store (req: Request, res: Response): Promise<Response> {
    try {
      const { day, month, time, limit } = req.body

      const fields = ['day', 'month', 'time', 'limit']
      for (const field of fields) {
        if (typeof req.body[field] === 'string') {
          req.body[field] = req.body[field].trim()
        }
      }

      if (!day || !time || !limit || !month) {
        return res.status(400).json('Campo em branco')
      }

      if (parseInt(day) < 1 || parseInt(day) > 31) {
        return res.status(400).json('Dia inválido')
      }

      const schedule = await Schedule.create(req.body)

      return res.status(200).json(schedule)
    } catch (error) {
      console.log(error.message)
      return res.status(500).json('Server Error')
    }
  }

  public async registerPeople (req: Request, res: Response): Promise<Response> {
    try {
      const { body, params } = req
      const { name, wordKey } = body
      const { id } = params

      if (!name && !wordKey) {
        return res.status(400).json('Campo em branco')
      }

      const lastSchedule = await Schedule.findById(id)
      const { users, limit } = lastSchedule

      if (!(users.length <= limit)) {
        return res.status(400).json('Sem vagas neste período')
      }

      if (users.length + 1 >= limit) {
        lastSchedule.completed = true
      }

      lastSchedule.users.push(body)

      const schedule = await Schedule.findByIdAndUpdate({
        _id: id
      }, {
        $set: lastSchedule
      }, {
        upsert: true
      })

      return res.status(200).json(schedule)
    } catch (error) {
      console.log(error.message)
      return res.status(500).json('Server Error')
    }
  }
}

export default new ScheduleController()
