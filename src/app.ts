import express from 'express'
import dotenv from 'dotenv'
import userCntr from './controller/userController'

const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userCntr)

export default app
