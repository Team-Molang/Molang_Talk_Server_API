import * as amsModel from '../model/amsModel'
import ServerError from '../error/serverError'

export interface IAms {
  os: string
  version: string
  alert: string
  alertYn: boolean
  forceUpdateYn: boolean
}

export const get = async (os: string): Promise<IAms> => {
  const ams = await amsModel.get(os)
  if (!ams) throw new ServerError('ams 정보가 존재하지 않습니다.')
  return {
    os: ams.os,
    version: ams.version,
    alert: ams.alert,
    alertYn: ams.alert_yn === 'Y',
    forceUpdateYn: ams.force_update_yn === 'Y'
  }
}
