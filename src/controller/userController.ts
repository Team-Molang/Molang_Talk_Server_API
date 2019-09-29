import express from 'express'
import * as userDomain from '../domain/userDomain'
import { PointCode } from '../manager/pointManager'

const router = express.Router()

router.post('/', async (req, res, next) => {
  const { udid, nickName, gender, age } = req.body
	// TODO: validation
  const rtnUdid = await userDomain.join({
    udid, nickName, gender, age
  })
	// TODO: 최초 한번만 지급
  await userDomain.addPoint(rtnUdid, PointCode.JOIN)
  // TODO: rtnUdid 반환 with http status code
})

router.get('/', (req, res, next) => {
  console.log('get users')
})

export default router
