import admin from 'firebase-admin'
import { fcmConfig } from '../config/env'

const account = require(fcmConfig.FCM_CREDENTIAL)

let app: admin.app.App = null

export const init = () => {
  app = admin.initializeApp({
    credential: admin.credential.cert(account),
    databaseURL: 'https://amolang-molangtalk.firebaseio.com'
  })
}

export const send = async (title: string, body: string, token: string, data?: {}) => {
  const message = {
    notification: { title, body },
    data,
    token
  }
  const result = await app.messaging().send(message)
  console.log(result)
}
