import moment from 'moment'
import * as _ from 'lodash'
import ServerError from '../error/serverError'
import NotFoundError from '../error/notFoundError'
import UnauthorizedError from '../error/unauthorizedError'
import BadRequestError from '../error/badRequest'

import * as userDomain from './userDomain'
import * as pointModel from '../model/pointModel'
import * as matchingModel from '../model/matchingModel'

export const matching = async (userId: string, udid: string, type: string) => {
  const user = await userDomain.get(userId, udid)
  const isMatching = await matchingModel.isMatching(user.id)
  if (isMatching) throw new BadRequestError('이미 매칭 신청중입니다.')
  await matchingModel.matching(user.id, udid, type)
}

export const isMatching = async (userId: string, udid: string) => {
  const user = await userDomain.get(userId, udid)
  const isMatching = await matchingModel.isMatching(user.id)
  return isMatching
}

export const cancel = async (userId: string, udid: string) => {
  const user = await userDomain.get(userId, udid)
  const isMatching = await matchingModel.isMatching(user.id)
  if (!isMatching) throw new BadRequestError('취소할 매칭이 없습니다.')
  await matchingModel.cancelMatching(user.id)
}
