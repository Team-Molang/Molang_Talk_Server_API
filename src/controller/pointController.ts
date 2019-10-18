import express from 'express'
import asyncFn from '../manager/asyncManager'
import * as userDomain from '../domain/userDomain'
const router = express.Router({
  mergeParams: true
})
router.get('/', asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const id = req.params.id
  const udid = req.headers.authorization
  res.status(200).send(await userDomain.point(id, udid))
}))

router.get('/histories', asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const id = req.params.id
  const udid = req.headers.authorization
  res.status(200).send(await userDomain.pointHistories(id, udid))
}))

export default router
