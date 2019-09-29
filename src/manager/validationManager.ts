import { Request } from 'express'
import { validationResult } from 'express-validator'
import BadRequestError from '../error/badRequest'

const valid = (req: Request) => {
  const errors = validationResult(req).array({ onlyFirstError: true })
  if (errors.length > 0) throw new BadRequestError(`${errors[0].msg} [${errors[0].param}]`)
}
export default valid
