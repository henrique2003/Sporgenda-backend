import { Schema, model, Document } from 'mongoose'

interface ISchedule extends Document {
  month: string
  day: string
  time: string
  location: string
  users?: string[]
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
  users: [String]
}, {
  timestamps: true
})

export default model<ISchedule>('Schedule', UserSchema)
