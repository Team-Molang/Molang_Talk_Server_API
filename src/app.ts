import express from 'express'
import userCntr from './controller/userController'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userCntr)

export default app
