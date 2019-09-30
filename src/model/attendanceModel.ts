import { mysql } from '../manager/databaseManager'
import ServerError from '../error/serverError'
import { DML } from './'

export const attendance = mysql.transaction(async (con: any, id: number, pointCode: string, attendanceYear: string, attendanceMonth: string, attendanceDay: string) => {
  const pointResult = await con.query(DML.GET_POINT, [pointCode])
  if (pointResult.length < 1) throw new ServerError(`지급할 포인트 정보가 없습니다. [${pointCode}]`)
  const point = pointResult[0].point
  await con.query(DML.INSERT_ATTENDANCE, [id, attendanceYear, attendanceMonth, attendanceDay])
  await con.query(DML.INSERT_POINT_HISTORY, [id, pointCode, point])
  await con.query(DML.UPDATE_POINT, [point, id])
})

export const isAvailable = mysql.connect(async (con: any, id: number, attendanceYear: string, attendanceMonth: string, attendanceDay: string) => {
  const attendanceResult = await con.query(DML.GET_TODAY_ATTENDANCE, [id, attendanceYear, attendanceMonth, attendanceDay])
  return (attendanceResult.length < 1) ? true : false
})

export const getAttendances = mysql.connect((con: any, id: number, attendanceYear: string, attendanceMonth: string) =>
  con.query(DML.GET_MONTHLY_ATTENDANCE, [id, attendanceYear, attendanceMonth]))
