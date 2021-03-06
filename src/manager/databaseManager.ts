import moment from 'moment'
import mongoose from 'mongoose'
import { mysqlConfig, mongoConfig } from '../config/env'
const promiseMysql = require('promise-mysql')

let pool: any = null
let mongooseCon: any = null

export const init = async () => {
  pool = await promiseMysql.createPool({
    connectionLimit: 20,
    host: mysqlConfig.MYSQL_HOST,
    user: mysqlConfig.MYSQL_USER,
    password: mysqlConfig.MYSQL_PASSWORD,
    database: 'molangtalk'
  })

  mongooseCon = await mongoose.connect(`mongodb://${mongoConfig.MONGO_USER}:${mongoConfig.MONGO_PASSWORD}@${mongoConfig.MONGO_HOST}/${mongoConfig.MONGO_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

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

export const mongo = mongoose.createConnection(`mongodb://${mongoConfig.MONGO_USER}:${mongoConfig.MONGO_PASSWORD}@${mongoConfig.MONGO_HOST}/${mongoConfig.MONGO_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export const now = () => moment().utcOffset(540).format('YYYY-MM-DD HH:mm:ss.SSS')
