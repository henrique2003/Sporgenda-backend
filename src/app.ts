import express from 'express'

class App {
  public readonly express: express.Application

  constructor () {
    this.express = express()
  }

  middlewares (): void {
    // this.express.use(cors())
    // this.express.use(helmet())
    // this.express.use('/api', )
  }

  database (): void {

  }
}

export default new App().express
