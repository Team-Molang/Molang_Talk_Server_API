import express from 'express'
import { param } from 'express-validator'
import asyncFn from '../manager/asyncManager'
import valid from '../manager/validationManager'
import * as amsDomain from '../domain/amsDomain'

const router = express.Router()

router.get('/:os',
  [
    param('os').exists().isIn(['AOS', 'IOS'])
  ],
  asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    valid(req)
    const os = req.params.os
    res.status(200).send(await amsDomain.get(os))
  })
)

export default router
