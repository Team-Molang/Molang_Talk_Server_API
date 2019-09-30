import express from 'express'
import asyncFn from '../manager/asyncManager'
import * as userDomain from '../domain/userDomain'
const router = express.Router({
  mergeParams: true
})

router.get('/', asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { udid } = req.params
  res.status(200).send(await userDomain.getAttendances(udid))
}))

router.post('/', asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { udid } = req.params
  await userDomain.attendance(udid)
  res.sendStatus(200)
}))

export default router
