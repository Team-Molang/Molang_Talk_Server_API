export const mysqlConfig = {
  MYSQL_HOST: (process.env.MYSQL_HOST) ? process.env.MYSQL_HOST : 'localhost',
  MYSQL_USER: (process.env.MYSQL_USER) ? process.env.MYSQL_USER : '',
  MYSQL_PASSWORD: (process.env.MYSQL_PASSWORD) ? process.env.MYSQL_PASSWORD : ''
}
