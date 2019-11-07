import { mysql } from '../manager/databaseManager'
import ServerError from '../error/serverError'
import { DML } from './'

export const addPoint = mysql.transaction(async (con: any, id: number, pointCode: string) => {
  const pointResult = await con.query(DML.GET_POINT, [pointCode])
  if (pointResult.length < 1) throw new ServerError(`포인트 정보가 없습니다. [${pointCode}]`)
  const point = pointResult[0].point

  await con.query(DML.INSERT_POINT_HISTORY, [id, pointCode, point])
  await con.query(DML.UPDATE_POINT, [point, id])
})

export const getPointHistories = mysql.connect((con: any, id: number) =>
  con.query(DML.GET_POINT_HISTORY, [id]))

export const getDefPoint = mysql.connect(async (con: any, pointCode: string) => {
  const pointResult = await con.query(DML.GET_POINT, [pointCode])
  if (pointResult.length < 1) throw new ServerError(`포인트 정보가 없습니다. [${pointCode}]`)
  return pointResult[0].point
})
