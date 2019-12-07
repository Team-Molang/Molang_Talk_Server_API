require('dotenv').config()

import errorHandler from 'errorhandler'
import * as databaseManager from './manager/databaseManager'
import * as fcmManager from './manager/fcmManager'
import app from './app'

app.use(errorHandler())

databaseManager.init()
.then(() => {
  console.log('success init database')

  fcmManager.init()
  console.log('success init fcm')

  app.listen(3000, () => {
    console.log(
      '  App is running at http://localhost:%d in %s mode',
      '3000',
      app.get('env')
    )
    console.log('  Press CTRL-C to stop\n')
  })
})
.catch((err) => { console.error('failed init database' + err) })
