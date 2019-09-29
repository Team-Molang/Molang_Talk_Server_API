import * as userModel from '../model/userModel'
import * as pointModel from '../model/pointModel'
import ServerError from '../error/serverError'

export enum PointCode {
  JOIN
}

export interface IUser {
  id: number
  udid: string
  nickName: string
  gender: string
  age: number
  point: number
  regDate?: string
}

export interface IJoinUser {
  udid: string
  nickName: string
  gender: string
  age: number
}

const createUdid = (udid: string) => udid + new Date().getTime()

export const join = async (user: IJoinUser): Promise<string> => {
  const udid = createUdid(user.udid)
  const result = await userModel.join(udid, user.nickName, user.gender, user.age)
  if (result.insertId < 1) throw new ServerError('새로운 회원 데이터를 생성하는 중 DB 에러가 발생하였습니다.')
  return udid
}

export const addPoint = async (udid: string, pointCode: PointCode): Promise<void> => {
  await pointModel.addPoint(udid, pointCode)
}

export const get = (udid: string) => {
  // TODO: udid에 해당하는 회원 조회
  // TODO: IUser 반환
}
