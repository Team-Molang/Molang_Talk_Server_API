import { mysql } from '../manager/databaseManager'
import { DML } from './'

export const join = mysql.connect((con: any, udid: string, nickName: string, gender: string, age: number) =>
	con.query(DML.INSERT_USER, [udid, nickName, gender, age, 0]))

export const getUser = mysql.connect(async (con: any, id: string) => {
  const userResult = await con.query(DML.GET_USER, [id])
  return (userResult.length > 0) ? userResult[0] : null
})

export const getUserExist = mysql.connect(async (con: any, udid: string) => {
  const userResult = await con.query(DML.GET_USER_EXIST, [udid])
  return (userResult.length > 0) ? userResult[0] : null
})

export const updateUser = mysql.connect((con: any, id: string, nickName: string, age: number, profile: string) =>
  con.query(DML.UPDATE_USER, [nickName, age, profile, id]))

export const updatePushKey = mysql.connect((con: any, id: number, key: string) =>
  con.query(DML.UPDATE_PUSH_KEY, [key, id]))
