import * as chattingModel from '../model/chattingModel'
import ServerError from '../error/serverError'

export interface IChatting {
  id: string
  user: IUser
  lastMessage: IMessage
}
interface IUser {
  id: string
  userId: number
  nickName: string
  gender: string
  age: number
  profile: string
}
interface IMessage {
  id: string
  type: string
  data: string
  datetime: string
}

export const getMyChattings = async (userId: string): Promise<IChatting[]> => {
  const myChattings = await chattingModel.getMyChattings(userId)
  console.log(myChattings)
  return []
}
