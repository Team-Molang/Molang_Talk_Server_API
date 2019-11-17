import express from 'express'
import { param, header, body, query } from 'express-validator'
import asyncFn from '../manager/asyncManager'
import { valid } from '../handler'
import * as matchingDomain from '../domain/matchingDomain'

const router = express.Router()

router.post('/',
  [
    body('userId').exists(),
    body('type').isIn(['EVERYONE', 'DIFFERENT_GENDER']),
    header('authorization').exists(),
    valid()
  ],
  asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { userId, type } = req.body
    const udid = req.headers.authorization
    await matchingDomain.matching(userId, udid, type)
    res.status(200).send({})
  })
)

router.get('/',
  [
    query('userId').exists(),
    header('authorization').exists(),
    valid()
  ],
  asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userId = req.query.userId
    const udid = req.headers.authorization
    res.status(200).send({
      isMatching: await matchingDomain.isMatching(userId, udid)
    })
  })
)

router.delete('/',
  [
    body('userId').exists(),
    header('authorization').exists(),
    valid()
  ],
  asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userId = req.body.userId
    const udid = req.headers.authorization
    await matchingDomain.cancel(userId, udid)
    res.status(200).send({})
  })
)

export default router
