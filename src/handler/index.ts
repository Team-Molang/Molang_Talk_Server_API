import express from 'express'
import BadRequest from '../error/badRequest'
import NotFound from '../error/notFoundError'
import ServerError from '../error/serverError'
import Unauthorized from '../error/unauthorizedError'
import asyncFn from '../manager/asyncManager'
import { validationResult } from 'express-validator'

const errorResponse = (err: Error) => ({ error: err.name, message: err.message })

export const errorHandler = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // TODO: change logger
  console.error(err)
  if (!err) return next()
  if (err instanceof BadRequest) return res.status(400).send(errorResponse(err))
  if (err instanceof Unauthorized) return res.status(401).send(errorResponse(err))
  if (err instanceof NotFound) return res.status(404).send(errorResponse(err))
  if (err instanceof ServerError) return res.status(500).send(errorResponse(err))
  res.status(500).send({
    error: 'UNKOWN_ERROR',
    message: '알 수 없는 에러가 발생하였습니다.'
  })
}

// TODO: 추후에 권한 체크 로직 분리 생각 해보기

export const valid = () =>
  asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true })
    if (errors.length > 0) throw new BadRequest(`${errors[0].msg} [${errors[0].param}]`)
    next()
  })
