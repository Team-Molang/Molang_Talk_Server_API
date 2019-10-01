require('dotenv').config()

import express from 'express'
import * as swaggerUI from 'swagger-ui-express'
import * as jsdoc from './config/swagger'
import { errorHandler } from './handler'
import { serverConfig } from './config/env'
import userCntr from './controller/userController'
import fileCntr from './controller/fileController'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(jsdoc.swagger, { deepLinking: true }))
}

app.use(`/${serverConfig.API_VERSION}/users`, userCntr)
app.use(`/${serverConfig.API_VERSION}/files`, fileCntr)

app.use(errorHandler)
export default app
