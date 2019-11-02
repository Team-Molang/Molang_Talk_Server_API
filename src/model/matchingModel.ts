import { mysql } from '../manager/databaseManager'
import ServerError from '../error/serverError'
import { DML } from './'

export const matchingEveryOne = mysql.connect(async (con: any, userId: number) => {
  const matchingTarget = await con.query(DML.GET_EVERYONE_MATCHING, [userId])
	// TODO: 타겟 없으면 큐에 등록 후 끝
	// TODO: 둘중 한명이라도 포인트 없으면 실패 (트랜잭셔널)
	// TODO: 타겟 있으면 둘다 포인트 차감
	// TODO: 매칭상태 완료로 변경
})

export const matchingDifferentGender = mysql.connect(async (con: any, userId: number, gender: string) => {
  const matchingTarget = await con.query(DML.GET_DIFFERENT_GENDER_MATCHING, [userId, gender])
})
