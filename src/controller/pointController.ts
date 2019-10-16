import express from 'express'
import asyncFn from '../manager/asyncManager'
const router = express.Router({
  mergeParams: true
})

router.get('/', asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { udid } = req.params
	// TODO: 현재 point 조회 API
  res.sendStatus(200)
}))

router.get('/histories', asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { udid } = req.params
	// TODO: 현재 point history 조회 API
  res.sendStatus(200)
}))

export default router
