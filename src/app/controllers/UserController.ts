import { Request, Response, NextFunction } from 'express'
import { sign } from 'jsonwebtoken'
import { hash, compare } from 'bcrypt'
import User from '../models/User'

class UserController {
  public async post (req: Request, res: Response): Promise<Response> {
    try {
      req.body.password = await hash(req.body.password, 10)

      const user = await User.create(req.body)

      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json('Server Error')
    }
  }

  public async login (req: Request, res: Response): Promise<Response> {
    try {
      const { name, password } = req.body

      const user = await User.findOne({ name })

      if (!user) {
        return res.status(400).json('Usuário não encontrado')
      }

      if (await compare(user.password, password)) {
        return res.status(400).json('Senha inválida')
      }

      const token = sign(user.id, 'sporgenda123', { expiresIn: 8460 })

      return res.status(200).json({ user, token })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json('Server Error')
    }
  }

  public async auth (req: Request, res: Response): Promise<Response> {
    try {
      const { name, password } = req.body

      const user = await User.findOne({ name })

      if (!user) {
        return res.status(400).json('Usuário não encontrado')
      }

      if (await compare(user.password, password)) {
        return res.status(400).json('Senha inválida')
      }

      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json('Server Error')
    }
  }
}

export default new UserController()
