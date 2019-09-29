import express from 'express'
import { body, oneOf, validationResult } from 'express-validator'
import * as userDomain from '../domain/userDomain'
import { PointCode } from '../manager/pointManager'
import asyncFn from '../manager/asyncManager'
import valid from '../manager/validationManager'

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
    console.log(typeof udid)
    console.log(nickName)
    console.log(gender)
    console.log(age)
    const rtnUdid = await userDomain.join({
      udid, nickName, gender, age
    })
    // TODO: 최초 한번만 지급
    await userDomain.addPoint(rtnUdid, PointCode.JOIN)
    // TODO: rtnUdid 반환 with http status code
    next()
  })
)

router.get('/', (req, res, next) => {
  console.log('get users')
})

export default router
