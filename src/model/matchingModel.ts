import { mysql } from '../manager/databaseManager'
import ServerError from '../error/serverError'
import { DML } from './'

export const matchingEveryOne = mysql.connect(async (con: any, userId: number, gender: string) => {
  const matchingTarget = await con.query(DML.GET_EVERYONE_MATCHING, [userId])
  if (matchingTarget.length < 1) {
    await con.query(DML.INSERT_NEW_MATCHING, [userId, gender, 'EVERYONE'])
  } else {
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
		// TODO: 둘중 한명이라도 포인트 없으면 실패 (트랜잭셔널)
    // TODO: 타겟 있으면 둘다 포인트 차감 (해당 신청한 포인트만큼만 차감, 트랜잭셔널)
    // TODO: 매칭상태 완료로 변경
  }
})

export const isMatching = mysql.connect(async (con: any, userId: number) => {
  const myMatching = await con.query(DML.GET_MY_MATCHING, [userId])
  return (myMatching.length > 0)
})
