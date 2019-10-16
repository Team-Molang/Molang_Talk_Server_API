import express from 'express'
import asyncFn from '../manager/asyncManager'
import * as userDomain from '../domain/userDomain'
const router = express.Router({
  mergeParams: true
})

router.get('/', asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { udid } = req.params
  res.status(200).send(await userDomain.point(udid))
}))

router.get('/histories', asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { udid } = req.params
  res.status(200).send(await userDomain.pointHistories(udid))
}))

export default router
