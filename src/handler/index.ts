import express from 'express'
import BadRequest from '../error/badRequest'
import NotFound from '../error/notFoundError'
import ServerError from '../error/serverError'
import UnauthorizedError from '../error/unauthorizedError'

const errorResponse = (err: Error) => ({ error: err.name, message: err.message })

export const errorHandler = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // TODO: change logger
  console.error(err)
  if (!err) return next()
  if (err instanceof BadRequest) return res.status(400).send(errorResponse(err))
  if (err instanceof UnauthorizedError) return res.status(401).send(errorResponse(err))
  if (err instanceof NotFound) return res.status(404).send(errorResponse(err))
  if (err instanceof ServerError) return res.status(500).send(errorResponse(err))
  res.status(500).send({
    error: 'UNKOWN_ERROR',
    message: '알 수 없는 에러가 발생하였습니다.'
  })
}
