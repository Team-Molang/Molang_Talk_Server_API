import express from 'express'
import asyncFn from '../manager/asyncManager'
import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'

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
upload.fields([{ name: 'file' }]),
  (req, res, next) => {
    res.status(200).send(req.files)
    // TODO: fileupload with multer
  }
)

export default router
