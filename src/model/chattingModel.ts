import mongoose from 'mongoose'
import { mysql, mongo, now } from '../manager/databaseManager'

const ChattingSchema = new mongoose.Schema({
  users: [new mongoose.Schema({
    user_id: Number,
    nick_name: String,
    gender: String,
    age: Number,
    profile: String
  })],
  messages: [new mongoose.Schema({
    type: String,
    data: String,
    datetime: String
  })],
  ing: Boolean
}, {
  versionKey: false
})

const ChattingModel = mongo.model('chatting', ChattingSchema, 'chatting')

export const getMyChattings = (userId: number) => {
  return new Promise((resolve, reject) => {
    ChattingModel.find({ 'users.user_id': userId }, (err: Error, res: any) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}
