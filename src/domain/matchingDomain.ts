import moment from 'moment'
import * as _ from 'lodash'
import ServerError from '../error/serverError'
import NotFoundError from '../error/notFoundError'
import UnauthorizedError from '../error/unauthorizedError'
import BadRequestError from '../error/badRequest'

import * as userDomain from './userDomain'
import * as pointModel from '../model/pointModel'
import * as matchingModel from '../model/matchingModel'

enum PointCode {
	MATCHING_EVERYONE = 'MATCHING_EVERYONE',
	MATCHING_DIFFERENT_GENDER = 'MATCHING_DIFFERENT_GENDER'
}

export const matching = async (userId: string, udid: string, type: string) => {
  const isMatching = await matchingModel.isMatching(userId)
  if (isMatching) throw new BadRequestError('이미 매칭 신청중입니다.')
  const pointCode = (type === 'DIFFERENT_GENDER') ? PointCode.MATCHING_DIFFERENT_GENDER : PointCode.MATCHING_EVERYONE
  const user = await userDomain.get(userId, udid)
  const matchingPoint = await pointModel.getDefPoint(pointCode)
  if (user.point < (-matchingPoint)) throw new BadRequestError('매칭 신청에 필요한 포인트가 부족합니다.')
  if (type === 'DIFFERENT_GENDER') {
    await matchingModel.matchingDifferentGender(userId, user.gender)
  } else {
    await matchingModel.matchingEveryOne(userId, user.gender)
  }
}
