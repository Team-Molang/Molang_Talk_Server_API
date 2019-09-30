import { mysql } from '../manager/databaseManager'

export const join = mysql.connect((con: any, udid: string, nickName: string, gender: string, age: number) =>
	con.query(`
		INSERT INTO tb_user (
			udid,
			nick_name,
			gender,
			age,
			point,
			reg_date
		) VALUES (
			?,
			?,
			?,
			?,
			?,
			sysdate()
		)`, [udid, nickName, gender, age, 0]))

export const getUser = mysql.connect(async (con: any, udid: string) => {
  const userResult = await con.query(`SELECT * FROM tb_user WHERE udid = ?`, [udid])
  return (userResult.length > 0) ? userResult[0] : null
})
