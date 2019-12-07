import moment from 'moment'
import * as _ from 'lodash'
import * as userModel from '../model/userModel'
import * as pointModel from '../model/pointModel'
import * as attendanceModel from '../model/attendanceModel'
import ServerError from '../error/serverError'
import NotFoundError from '../error/notFoundError'
import UnauthorizedError from '../error/unauthorizedError'
import BadRequestError from '../error/badRequest'

export enum PointCode {
  JOIN = 'JOIN',
  ATTENDANCE = 'ATTENDANCE'
}

export interface IUser {
  id: number
  nickName: string
  gender: string
  age: number
  point: number
  profile?: string
  regDate: string
  pushKey?: string
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

export interface IAttendance {
  attendanceYear: string
  attendanceMonth: string
  attendanceDay: string
  regDate: string
}

export interface IEditUser {
  nickName: string
  age: number
  profile?: string
}

export interface IPoint {
  point: number
}

export interface IPointHistory {
  point: number
  pointName: string
  regDate: string
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

export const get = async (id: string, udid: string): Promise<IUser> => {
  const user = await userModel.getUser(id)
  if (!user) throw new NotFoundError('회원 정보를 찾을 수 없습니다.')
  if (user.udid !== udid) throw new UnauthorizedError('권한이 없습니다.')
  return {
    id: user.id,
    nickName: user.nick_name,
    gender: user.gender,
    age: user.age,
    point: user.point,
    profile: user.profile,
    regDate: user.reg_date,
    pushKey: user.push_key
  }
}

export const edit = async (id: string, udid: string, editUser: IEditUser) => {
  const user = await get(id, udid)
  const result = await userModel.updateUser(user.id, editUser.nickName, editUser.age, editUser.profile)
  if (result.affectedRows < 1) throw new ServerError('회원정보를 수정하는 중 DB 에러가 발생하였습니다.')
}

export const attendance = async (id: string, udid: string): Promise<void> => {
  const attendanceYear = moment().format('YY')
  const attendanceMonth = moment().format('MM')
  const attendanceDay = moment().format('DD')
  const user = await get(id, udid)

  const isAvailable = await attendanceModel.isAvailable(user.id, attendanceYear, attendanceMonth, attendanceDay)
  if (!isAvailable) throw new BadRequestError('이미 출석하였습니다.')

  await attendanceModel.attendance(user.id, PointCode.ATTENDANCE, attendanceYear, attendanceMonth, attendanceDay)
}

export const getAttendances = async (id: string, udid: string): Promise<IAttendance[]> => {
  const attendanceYear = moment().format('YY')
  const attendanceMonth = moment().format('MM')
  const user = await get(id, udid)

  const attendances = await attendanceModel.getAttendances(user.id, attendanceYear, attendanceMonth)
  return _.map(attendances, (attendance: any) => ({
    attendanceYear: attendance.attendance_year,
    attendanceMonth: attendance.attendance_month,
    attendanceDay: attendance.attendance_day,
    regDate: attendance.reg_date
  }))
}

export const point = async (id: string, udid: string): Promise<IPoint> => {
  const user = await get(id, udid)
  return { point: user.point }
}

export const pointHistories = async (id: string, udid: string): Promise<IPointHistory[]> => {
  const user = await get(id, udid)
  const histories = await pointModel.getPointHistories(user.id)
  return _.map(histories, (history: any) => ({
    point: history.point,
    pointName: history.point_name,
    regDate: history.reg_date
  }))
}

export const addPushKey = async (id: string, udid: string, key: string) => {
  const user = await get(id, udid)
  await userModel.updatePushKey(user.id, key)
}

export const existCheck = async (udid: string): Promise<void> => {
  const user = await userModel.getUserExist(udid)
  if (!user) throw new UnauthorizedError('권한이 없습니다.')
}
