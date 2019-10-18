import express from 'express'
import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { header } from 'express-validator'
import ServerError from '../error/serverError'
import asyncFn from '../manager/asyncManager'
import valid from '../manager/validationManager'
import * as fileDomain from '../domain/fileDomain'
import * as userDomain from '../domain/userDomain'

const router = express.Router()
const s3 = new aws.S3({
  region: 'ap-northeast-2'
})
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'talk.amolang.shop',
    acl: 'public-read-write',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString())
    }
  })
})
router.post('/',
  [
    header('authorization').exists()
  ],
	upload.single('file'),
  asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    valid(req)
    const udid = req.headers.authorization
    await userDomain.existCheck(udid)
    if (!req.file) throw new ServerError('파일 업로드에 실패하였습니다.')

    await fileDomain.save({
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      location: req.file.location,
      udid: udid
    })
    res.status(200).send({
      url: req.file.location
    })
  })
)

export default router
