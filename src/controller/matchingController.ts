import express from 'express'
import { header } from 'express-validator'
import asyncFn from '../manager/asyncManager'
import valid from '../manager/validationManager'

const router = express.Router()

router.get('/',
  [
    header('authorization').exists()
  ],
  asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    valid(req)
    const udid = req.headers.authorization
    console.log(udid)
    // TODO: 매칭 상태 조회 API
  })
)

router.post('/',
  [
    header('authorization').exists()
  ],
  asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    valid(req)
    const udid = req.headers.authorization
    console.log(udid)
    // TODO: 매칭 신청 API
  })
)

router.delete('/',
  [
    header('authorization').exists()
  ],
  asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    valid(req)
    const udid = req.headers.authorization
    console.log(udid)
    // TODO: 매칭 취소 API
  })
)

export default router
