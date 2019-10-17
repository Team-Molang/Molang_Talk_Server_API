import { mysql } from '../manager/databaseManager'
import { DML } from './'

export const save = mysql.connect((con: any, originalname: string, mimetype: string, size: number, location: string, udid: string) =>
  con.query(DML.INSERT_FILE, [originalname, mimetype, size, location, udid]))
