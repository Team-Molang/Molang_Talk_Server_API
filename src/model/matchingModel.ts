import mongoose from 'mongoose'
import { mysql, mongo, now } from '../manager/databaseManager'
import ServerError from '../error/serverError'
import BadRequestError from '../error/badRequest'
import NotFoundError from '../error/notFoundError'
import { DML } from './'
import * as fcmManager from '../manager/fcmManager'

import * as userDomain from '../domain/userDomain'
import * as pointModel from './pointModel'
import * as userModel from './userModel'

enum PointCode {
	MATCHING_EVERYONE = 'MATCHING_EVERYONE',
	MATCHING_DIFFERENT_GENDER = 'MATCHING_DIFFERENT_GENDER'
}

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

export const matching = mysql.transaction(async (con: any, userId: string, udid: string, type: string) => {
  const pointCode = (type === 'DIFFERENT_GENDER') ? PointCode.MATCHING_DIFFERENT_GENDER : PointCode.MATCHING_EVERYONE
  const matchingPoint = await pointModel.getDefPoint(pointCode)

  const user = await userDomain.get(userId, udid)
  if (user.point < (-matchingPoint)) throw new BadRequestError('매칭 신청에 필요한 포인트가 부족합니다.')

  const matchingTarget = (type === 'DIFFERENT_GENDER') ?
    await con.query(DML.GET_DIFFERENT_GENDER_MATCHING, [userId, user.gender]) :
    await con.query(DML.GET_EVERYONE_MATCHING, [userId, user.gender])

  if (matchingTarget.length < 1) {
    await con.query(DML.INSERT_NEW_MATCHING, [userId, type, user.gender])
  } else {
    const targetUser = await userDomain.get(matchingTarget[0].user_id)
    if (targetUser.point < (-matchingPoint)) {
      await con.query(DML.UPDATE_CANCEL_MATCHING, [targetUser.id])
      await con.query(DML.INSERT_NEW_MATCHING, [userId, type, user.gender])
    } else {
      await pointModel.addPoint(user.id, pointCode)
      await pointModel.addPoint(targetUser.id, pointCode) // TODO: 상대가 신청한 타입의 포인트 차감
      await con.query(DML.INSERT_MATCHING, [userId, type, user.gender])
      await con.query(DML.UPDATE_MATCHING, [targetUser.id])

      const chatting = new ChattingModel({
        users: [
          { user_id: user.id, nick_name: user.nickName, gender: user.gender, age: user.age, profile: user.profile },
          { user_id: targetUser.id, nick_name: targetUser.nickName, gender: targetUser.gender, age: targetUser.age, profile: targetUser.profile }
        ],
        messages: [{
          type: 'TEXT',
          data: '새로운 대화가 시작되었습니다.',
          datetime: now()
        }],
        ing: true
      })

      const chattingRoomId = await chatting.save()
      const title = '매칭이 완료되었습니다.'
      const body = '지금 바로 새로운 대화를 시작해보세요.'

      if (user.pushKey) {
        await fcmManager.send(title, body, user.pushKey, { chattingRoomId: chattingRoomId.id })
      }
      if (targetUser.pushKey) {
        await fcmManager.send(title, body, targetUser.pushKey, { chattingRoomId: chattingRoomId.id })
      }
    }
  }
})

export const isMatching = mysql.connect(async (con: any, userId: number) => {
  const myMatching = await con.query(DML.GET_MY_MATCHING, [userId])
  return (myMatching.length > 0)
})

export const cancelMatching = mysql.connect(async (con: any, userId: number) => {
  await con.query(DML.UPDATE_CANCEL_MATCHING, [userId])
})
