import express from 'express'
import { param, header, body } from 'express-validator'
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
    res.sendStatus(200)
  })
)

router.get('/',
  [
    body('userId').exists(),
    header('authorization').exists(),
    valid()
  ],
  asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // TODO: 매칭 상태 조회
    // TODO: 이 API는 폴링으로 사용될 예정
    res.status(200).send({})
  })
)

router.delete('/',
  [
    body('userId').exists(),
    header('authorization').exists(),
    valid()
  ],
  asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // TODO: 매칭 취소처리
    res.status(200).send({})
  })
)

export default router
