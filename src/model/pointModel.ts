import { mysql } from '../manager/databaseManager'
import ServerError from '../error/serverError'

export const addPoint = mysql.transaction(async (con: any, udid: string, pointCode: string) => {
  const point = await con.query(`SELECT point FROM tb_point WHERE point_code = ?`, [pointCode])
  if (point.length < 1) throw new ServerError(`지급할 포인트 정보가 없습니다. ${pointCode}`)
  // TODO: point update
  // TODO: point history insert
  // TODO: rollback if failed anyone
  console.log(point)
})
