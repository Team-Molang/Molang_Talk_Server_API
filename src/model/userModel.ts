import { mysql } from '../manager/databaseManager'
import { DML } from './'

export const join = mysql.connect((con: any, udid: string, nickName: string, gender: string, age: number) =>
	con.query(DML.INSERT_USER, [udid, nickName, gender, age, 0]))

export const getUser = mysql.connect(async (con: any, udid: string) => {
  const userResult = await con.query(DML.GET_USER, [udid])
  return (userResult.length > 0) ? userResult[0] : null
})
