import express from 'express'
import { body, param, header } from 'express-validator'
import * as userDomain from '../domain/userDomain'
import asyncFn from '../manager/asyncManager'
import valid from '../manager/validationManager'

import attendanceController from './attendanceController'
import pointController from './pointController'

const router = express.Router()

router.post('/',
  [
    body('udid').exists(),
    body('nickName').exists(),
    body('gender').exists().isIn(['M', 'F']),
    body('age').exists().isInt()
  ],
  asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    valid(req)
    const { udid, nickName, gender, age } = req.body
    const joinResult = await userDomain.join({ udid, nickName, gender, age })
    await userDomain.addPoint(joinResult.id, userDomain.PointCode.JOIN)
    res.status(200).send({
      id: joinResult.id,
      authorization: joinResult.udid
    })
  })
)

router.get('/:id',
  [
    param('id').exists().isInt(),
    header('authorization').exists()
  ],
  asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    valid(req)
    const id = req.params.id
    const udid = req.headers.authorization
    const user = userDomain.get(id, udid)
    res.status(200).send(await user)
  })
)

router.put('/:id',
  [
    param('id').exists().isInt(),
    header('authorization').exists(),
    body('nickName').exists(),
    body('age').exists().isInt()
  ],
  asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    valid(req)
    const id = req.params.id
    const udid = req.headers.authorization
    const { nickName, age, profile } = req.body
    await userDomain.edit(id, udid, { nickName, age, profile })
    res.sendStatus(200)
  })
)

router.use('/:id/attendances',
  [
    param('id').exists().isInt(),
    header('authorization').exists()
  ],
  attendanceController)

router.use('/:id/point',
  [
    param('id').exists().isInt(),
    header('authorization').exists()
  ],
  pointController)

router.put('/:id/pushkey',
  [
    param('id').exists().isInt(),
    header('authorization').exists(),
    body('key').exists().isString()
  ],
  asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    valid(req)
    const [id, udid, key] = [req.params.id, req.headers.authorization, req.body.key]
    await userDomain.addPushKey(id, udid, key)
    res.sendStatus(200)
  })
)

export default router
