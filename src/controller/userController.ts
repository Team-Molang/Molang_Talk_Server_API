import express from 'express'
import { body } from 'express-validator'
import * as userDomain from '../domain/userDomain'
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
    const joinResult = await userDomain.join({ udid, nickName, gender, age })
    await userDomain.addPoint(joinResult.id, userDomain.PointCode.JOIN)
    res.status(200).send({
      udid: joinResult.udid
    })
  })
)

router.get('/', (req, res, next) => {
  console.log('get users')
})

export default router
