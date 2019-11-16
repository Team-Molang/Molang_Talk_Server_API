require('dotenv').config()

import express from 'express'
import * as swaggerUI from 'swagger-ui-express'
import * as jsdoc from './config/swagger'
import * as databaseManager from './manager/databaseManager'
import { errorHandler } from './handler'
import { serverConfig } from './config/env'
import userCntr from './controller/userController'
import fileCntr from './controller/fileController'
import amsCntr from './controller/amsController'
import matchingCntr from './controller/matchingController'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

databaseManager.init()
.then(() => { console.log('success init database') })
.catch((err) => { console.error('failed init database' + err) })

if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(jsdoc.swagger, { deepLinking: true }))
}

app.use(`/${serverConfig.API_VERSION}/users`, userCntr)
app.use(`/${serverConfig.API_VERSION}/files`, fileCntr)
app.use(`/${serverConfig.API_VERSION}/ams`, amsCntr)
app.use(`/${serverConfig.API_VERSION}/matching`, matchingCntr)

app.use(errorHandler)
export default app
