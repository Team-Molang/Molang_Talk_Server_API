import express from 'express'
import * as userDomain from '../domain/userDomain'

const router = express.Router({
  mergeParams: true
})

router.get('/', async (req, res, next) => {
  const { udid } = req.params
  res.status(200).send(await userDomain.getAttendances(udid))
})

router.post('/', async (req, res, next) => {
  const { udid } = req.params
  await userDomain.attendance(udid)
  res.sendStatus(200)
})

export default router
