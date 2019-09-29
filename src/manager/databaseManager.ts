import { mysqlConfig } from '../config'
const promiseMysql = require('promise-mysql')

const pool = promiseMysql.createPool({
  connectionLimit: 20,
  host: mysqlConfig.MYSQL_HOST,
  user: mysqlConfig.MYSQL_USER,
  password: mysqlConfig.MYSQL_PASSWORD,
  database: 'molangtalk'
})

export namespace mysql {
  export const connect = (fn: Function) => async (...args: any[]) => {
    const con: any = await pool.getConnection()
    const result = await fn(con, ...args).catch((error: Error) => {
      con.connection.release()
      throw error
    })
    con.connection.release()
    return result
  }

  export const transaction = (fn: Function) => async (...args: any[]) => {
    const con: any = await pool.getConnection()
    await con.connection.beginTransaction()
    const result = await fn(con, ...args).catch(async (error: Error) => {
      await con.rollback()
      con.connection.release()
      throw error
    })
    await con.commit()
    con.connection.release()
    return result
  }
}
