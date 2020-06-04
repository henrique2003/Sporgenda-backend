import { Schema, model, Document } from 'mongoose'

interface ISchedule extends Document {
  month: string
  day: string
  time: string
  location: string
  limit: number
  completed: Boolean
  users?: User[]
}

export interface User {
  name: string
  wordKey: string
}

const UserSchema = new Schema({
  location: {
    type: String,
    required: true,
    trim: true
  },
  month: {
    type: String,
    required: true,
    trim: true
  },
  day: {
    type: Number,
    required: true
  },
  time: {
    type: String,
    required: true,
    trim: true
  },
  limit: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  users: [{
    name: {
      type: String,
      trim: true
    },
    wordKey: {
      type: String,
      trim: true
    }
  }]
}, {
  timestamps: true
})

export default model<ISchedule>('Schedule', UserSchema)
