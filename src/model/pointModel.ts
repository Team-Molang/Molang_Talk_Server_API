import { mysql } from '../manager/databaseManager'
import ServerError from '../error/serverError'

export const addPoint = mysql.transaction(async (con: any, id: number, pointCode: string) => {
  const pointResult = await con.query(`SELECT point FROM tb_point WHERE point_code = ?`, [pointCode])
  if (pointResult.length < 1) throw new ServerError(`지급할 포인트 정보가 없습니다. [${pointCode}]`)
  const point = pointResult[0].point

  await con.query(`
    INSERT INTO tb_point_history (
      user_id,
      point_code,
      point,
      reg_date
    ) VALUES (
      ?,
      ?,
      ?,
      sysdate()
    )`, [id, pointCode, point])
  await con.query(`UPDATE tb_user SET point = point + ? WHERE id = ?`, [point, id])
})
