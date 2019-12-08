import express from 'express'
import asyncFn from '../manager/asyncManager'
import { param, header, body, query } from 'express-validator'
import { valid } from '../handler'

const router = express.Router({
  mergeParams: true
})

router.get('/',
  [
    query('userId').exists(),
    header('authorization').exists(),
    valid()
  ],
  asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { userId } = req.query
    const udid = req.headers.authorization
    res.status(200).send([])
  })
)

export default router
