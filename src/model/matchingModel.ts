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
  const matchingQuery = (type === 'DIFFERENT_GENDER') ? DML.GET_DIFFERENT_GENDER_MATCHING : DML.GET_EVERYONE_MATCHING
  const matchingPoint = await pointModel.getDefPoint(pointCode)

  const user = await userDomain.get(userId, udid)
  if (user.point < (-matchingPoint)) throw new BadRequestError('매칭 신청에 필요한 포인트가 부족합니다.')

  const matchingTarget = await con.query(matchingQuery, [userId])
  if (matchingTarget.length < 1) {
    await con.query(DML.INSERT_NEW_MATCHING, [userId, user.gender, type])
  } else {
    const targetUser = await userModel.getUser(matchingTarget[0].user_id)
    if (!targetUser || targetUser.point < (-matchingPoint)) { // 상대방이 없거나 포인트가 부족할 경우 제외시키고 대기큐에 insert
      // TODO: 둘중 한명이라도 포인트 없으면 실패
    } else {
      // TODO: 둘다 포인트 차감
      // TODO: 둘다 매칭 완료로 변경
    }
  }
})

export const matchingEveryOne = mysql.connect(async (con: any, userId: number, gender: string) => {
  const matchingTarget = await con.query(DML.GET_EVERYONE_MATCHING, [userId])
  if (matchingTarget.length < 1) {
    await con.query(DML.INSERT_NEW_MATCHING, [userId, gender, 'EVERYONE'])
  } else {
    console.log(matchingTarget)
    // TODO: 둘중 한명이라도 포인트 없으면 실패 (트랜잭셔널)
    // TODO: 타겟 있으면 둘다 포인트 차감 (해당 신청한 포인트만큼만 차감, 트랜잭셔널)
    // TODO: 매칭상태 완료로 변경
  }
})

export const matchingDifferentGender = mysql.connect(async (con: any, userId: number, gender: string) => {
  const matchingTarget = await con.query(DML.GET_DIFFERENT_GENDER_MATCHING, [userId, gender])
  if (matchingTarget.length < 1) {
    await con.query(DML.INSERT_NEW_MATCHING, [userId, gender, 'DIFFERENT_GENDER'])
  } else {
    console.log(matchingTarget)
		// TODO: 둘중 한명이라도 포인트 없으면 실패 (트랜잭셔널)
    // TODO: 타겟 있으면 둘다 포인트 차감 (해당 신청한 포인트만큼만 차감, 트랜잭셔널)
    // TODO: 매칭상태 완료로 변경
  }
})

export const isMatching = mysql.connect(async (con: any, userId: number) => {
  const myMatching = await con.query(DML.GET_MY_MATCHING, [userId])
  return (myMatching.length > 0)
})
