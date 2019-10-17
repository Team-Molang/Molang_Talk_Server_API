import { mysql } from '../manager/databaseManager'
import { DML } from './'

export const get = mysql.connect(async (con: any, os: string) => {
  const ams = await con.query(DML.GET_AMS, [os])
  if (ams.length < 1) return null
  return ams[0]
})
