require('dotenv').config()

import express from 'express'
import * as swaggerUI from 'swagger-ui-express'
import * as jsdoc from './config/swagger'
import { serverConfig } from './config/env'
import userCntr from './controller/userController'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(jsdoc.swagger, { deepLinking: true }))
}

app.use(`/${serverConfig.API_VERSION}/users`, userCntr)

export default app
