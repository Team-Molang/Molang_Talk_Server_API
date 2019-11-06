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
    if (!targetUser || targetUser.point < (-matchingPoint)) {
      console.log('상대방 포인트 부족')
      // 상대방이 없거나 포인트가 부족할 경우 제외시키고 대기큐에 insert
    } else {
      console.log('포인트 차감 해야됨')
      console.log(user.id)
      console.log(targetUser.id)
      // TODO: 둘다 포인트 차감
      // TODO: 둘다 매칭 완료로 변경
    }
  }
})

export const isMatching = mysql.connect(async (con: any, userId: number) => {
  const myMatching = await con.query(DML.GET_MY_MATCHING, [userId])
  return (myMatching.length > 0)
})
