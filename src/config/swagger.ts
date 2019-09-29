import swaggerJSDoc = require('swagger-jsdoc')
import { serverConfig } from './env'
import { join } from 'path'

const apiDocOptions = {
  apis: [join(__dirname, '..', 'document', '*.yaml')],
  host: '',
  swaggerDefinition: {
    info: {
      description: '몰랑톡 API 서버',
      title: '몰랑톡',
      version: '1.0.0'
    }
  }
}

const jsDoc = swaggerJSDoc(apiDocOptions)
const information = {
  basePath: '/v1',
  host: `${serverConfig.HOST}`
}

export const swagger = { ...jsDoc, ...information }
