import * as fileModel from '../model/fileModel'
import ServerError from '../error/serverError'

export interface IFile {
  originalname: string
  mimetype: string
  size: number
  location: string
}

export const save = async (file: IFile): Promise<void> => {
  const result = await fileModel.save(file.originalname, file.mimetype, file.size, file.location)
  if (result.insertId < 1) throw new ServerError('파일을 저장하는 중 DB 에러가 발생하였습니다.')
}
