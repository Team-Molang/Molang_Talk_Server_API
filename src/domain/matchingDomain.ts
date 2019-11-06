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
  const isMatching = await matchingModel.isMatching(userId)
  if (isMatching) throw new BadRequestError('이미 매칭 신청중입니다.')
  await matchingModel.matching(userId, udid, type)
}
