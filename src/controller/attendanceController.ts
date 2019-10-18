import express from 'express'
import asyncFn from '../manager/asyncManager'
import * as userDomain from '../domain/userDomain'
const router = express.Router({
  mergeParams: true
})
router.get('/', asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const id = req.params.id
  const udid = req.headers.authorization
  res.status(200).send(await userDomain.getAttendances(id, udid))
}))

router.post('/', asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const id = req.params.id
  const udid = req.headers.authorization
  await userDomain.attendance(id, udid)
  res.sendStatus(200)
}))

export default router
