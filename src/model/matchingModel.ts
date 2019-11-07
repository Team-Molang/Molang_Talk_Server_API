import { mysql } from '../manager/databaseManager'
import ServerError from '../error/serverError'
import BadRequestError from '../error/badRequest'
import NotFoundError from '../error/notFoundError'
import { DML } from './'

import * as userDomain from '../domain/userDomain'
import * as pointModel from './pointModel'
import * as userModel from './userModel'

enum PointCode {
	MATCHING_EVERYONE = 'MATCHING_EVERYONE',
	MATCHING_DIFFERENT_GENDER = 'MATCHING_DIFFERENT_GENDER'
}

export const matching = mysql.connect(async (con: any, userId: string, udid: string, type: string) => {
  const pointCode = (type === 'DIFFERENT_GENDER') ? PointCode.MATCHING_DIFFERENT_GENDER : PointCode.MATCHING_EVERYONE
  const matchingPoint = await pointModel.getDefPoint(pointCode)

  const user = await userDomain.get(userId, udid)
  if (user.point < (-matchingPoint)) throw new BadRequestError('매칭 신청에 필요한 포인트가 부족합니다.')

  const matchingTarget = (type === 'DIFFERENT_GENDER') ?
    await con.query(DML.GET_DIFFERENT_GENDER_MATCHING, [userId, user.gender]) :
    await con.query(DML.GET_EVERYONE_MATCHING, [userId])

  if (matchingTarget.length < 1) {
    await con.query(DML.INSERT_NEW_MATCHING, [userId, type, user.gender])
  } else {
    const targetUser = await userModel.getUser(matchingTarget[0].user_id)
    if (targetUser.point < (-matchingPoint)) {
      await con.query(DML.UPDATE_CANCEL_MATCHING, [targetUser.id])
      await con.query(DML.INSERT_NEW_MATCHING, [userId, type, user.gender])
    } else {
      await pointModel.addPoint(user.id, pointCode)
      await pointModel.addPoint(targetUser.id, pointCode)
      await con.query(DML.INSERT_MATCHING, [userId, type, user.gender])
      await con.query(DML.UPDATE_MATCHING, [targetUser.id])

      // TODO: mongodb에 채팅방 insert
      // TODO: 양쪽 모두에게 push 발송 (방번호)
    }
  }
})

export const isMatching = mysql.connect(async (con: any, userId: number) => {
  const myMatching = await con.query(DML.GET_MY_MATCHING, [userId])
  return (myMatching.length > 0)
})
