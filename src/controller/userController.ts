import express from 'express'
import { body, param } from 'express-validator'
import * as userDomain from '../domain/userDomain'
import asyncFn from '../manager/asyncManager'
import valid from '../manager/validationManager'

import attendanceController from './attendanceController'

const router = express.Router()

router.post('/',
  [
    body('udid').exists().isString(),
    body('nickName').exists().isString(),
    body('gender').exists().isIn(['M', 'F']),
    body('age').exists().isInt()
  ],
  asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    valid(req)
    const { udid, nickName, gender, age } = req.body
    const joinResult = await userDomain.join({ udid, nickName, gender, age })
    await userDomain.addPoint(joinResult.id, userDomain.PointCode.JOIN)
    res.status(200).send({
      udid: joinResult.udid
    })
  })
)

router.get('/:udid',
  [
    param('udid').exists().isString()
  ],
  asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    valid(req)
    const { udid } = req.params
    const user = userDomain.get(udid)
    res.status(200).send(await user)
  })
)

router.put('/:udid',
  [
    param('udid').exists().isString(),
    body('nickName').exists().isString(),
    body('age').exists().isInt()
  ],
  asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    valid(req)
    const { udid } = req.params
    const { nickName, age, profile } = req.body
    await userDomain.edit({
      udid, nickName, age, profile
    })
    res.sendStatus(200)
  })
)

router.use('/:udid/attendances',
  [
    param('udid').exists().isString()
  ],
  attendanceController)

export default router
