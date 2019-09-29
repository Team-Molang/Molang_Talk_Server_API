import { PointCode } from '../manager/pointManager'

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

export const join = async (user: IJoinUser): Promise<string> => {
  // TODO: 가입 (udid + timestamp)
  // TODO: udid 반환
  return null
}

export const addPoint = async (udid: string, pointCode: PointCode): Promise<void> => {
  // TODO: 포인트 지급
}

export const get = (udid: string) => {
  // TODO: udid에 해당하는 회원 조회
  // TODO: IUser 반환
}
