import express from 'express'
import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import ServerError from '../error/serverError'
import asyncFn from '../manager/asyncManager'
import * as fileDomain from '../domain/fileDomain'

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

// TODO: udid 같이 받아서 최소한의 검증 필요
router.post('/',
	upload.single('file'),
  asyncFn(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.file) throw new ServerError('파일 업로드에 실패하였습니다.')
    await fileDomain.save({
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      location: req.file.location
    })
    res.status(200).send({
      url: req.file.location
    })
  })
)

export default router
