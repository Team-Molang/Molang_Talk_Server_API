import * as _ from 'lodash'
import * as userModel from '../model/userModel'
import * as pointModel from '../model/pointModel'
import ServerError from '../error/serverError'
import NotFoundError from '../error/notFoundError'

export enum PointCode {
  JOIN = 'JOIN',
  ATTENDANCE = 'ATTENDANCE'
}

export interface IUser {
  id: number
  udid: string
  nickName: string
  gender: string
  age: number
  point: number
  regDate: string
}

export interface IJoinUser {
  udid: string
  nickName: string
  gender: string
  age: number
}

export interface IJoinResult {
  id: number
  udid: string
}

const createUdid = (udid: string) => udid + new Date().getTime()

export const join = async (user: IJoinUser): Promise<IJoinResult> => {
  const udid = createUdid(user.udid)
  const result = await userModel.join(udid, user.nickName, user.gender, user.age)
  if (result.insertId < 1) throw new ServerError('새로운 회원 데이터를 생성하는 중 DB 에러가 발생하였습니다.')
  return {
    id: result.insertId,
    udid
  }
}

export const addPoint = async (id: number, pointCode: PointCode): Promise<void> => {
  await pointModel.addPoint(id, pointCode)
}

export const get = async (udid: string): Promise<IUser> => {
  const user = await userModel.getUser(udid)
  if (!user) throw new NotFoundError('회원 정보를 찾을 수 없습니다.')
  return {
    id: user.id,
    udid: user.udid,
    nickName: user.nick_name,
    gender: user.gender,
    age: user.age,
    point: user.point,
    regDate: user.reg_date
  }
}
