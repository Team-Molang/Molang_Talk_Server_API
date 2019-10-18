import moment from 'moment'
import * as _ from 'lodash'
import * as userModel from '../model/userModel'
import * as pointModel from '../model/pointModel'
import * as attendanceModel from '../model/attendanceModel'
import ServerError from '../error/serverError'
import NotFoundError from '../error/notFoundError'
import BadRequestError from '../error/badRequest'

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
  profile?: string
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

export interface IAttendance {
  attendanceYear: string
  attendanceMonth: string
  attendanceDay: string
  regDate: string
}

export interface IEditUser {
  udid: string
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
    profile: user.profile,
    regDate: user.reg_date
  }
}

export const attendance = async (udid: string): Promise<void> => {
  const attendanceYear = moment().format('YY')
  const attendanceMonth = moment().format('MM')
  const attendanceDay = moment().format('DD')
  const user = await get(udid)

  const isAvailable = await attendanceModel.isAvailable(user.id, attendanceYear, attendanceMonth, attendanceDay)
  if (!isAvailable) throw new BadRequestError('이미 출석하였습니다.')

  await attendanceModel.attendance(user.id, PointCode.ATTENDANCE, attendanceYear, attendanceMonth, attendanceDay)
}

export const getAttendances = async (udid: string): Promise<IAttendance[]> => {
  const attendanceYear = moment().format('YY')
  const attendanceMonth = moment().format('MM')
  const user = await get(udid)

  const attendances = await attendanceModel.getAttendances(user.id, attendanceYear, attendanceMonth)
  return _.map(attendances, (attendance: any) => ({
    attendanceYear: attendance.attendance_year,
    attendanceMonth: attendance.attendance_month,
    attendanceDay: attendance.attendance_day,
    regDate: attendance.reg_date
  }))
}

export const edit = async (editUser: IEditUser) => {
  const user = await get(editUser.udid)
  const result = await userModel.updateUser(user.udid, editUser.nickName, editUser.age, editUser.profile)
  if (result.affectedRows < 1) throw new ServerError('회원정보를 수정하는 중 DB 에러가 발생하였습니다.')
}

export const point = async (udid: string): Promise<IPoint> => {
  const user = await get(udid)
  return { point: user.point }
}

export const pointHistories = async (udid: string): Promise<IPointHistory[]> => {
  const user = await get(udid)
  const histories = await pointModel.getPointHistories(user.id)
  return _.map(histories, (history: any) => ({
    point: history.point,
    pointName: history.point_name,
    regDate: history.reg_date
  }))
}

export const addPushKey = async (udid: string, key: string) => {
  const user = await get(udid)
  await userModel.updatePushKey(user.id, key)
}
