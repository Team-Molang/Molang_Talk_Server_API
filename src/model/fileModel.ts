import { mysql } from '../manager/databaseManager'
import { DML } from './'

export const save = mysql.connect(async (con: any, originalname: string, mimetype: string, size: number, location: string) =>
  con.query(DML.INSERT_FILE, [originalname, mimetype, size, location]))
