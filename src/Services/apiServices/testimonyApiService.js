import { getPublicHandler } from '../BaseHTTP/publicApiService'
import {
  postPrivateHandler,
  putPrivateHandler,
  deletePrivateHandler,
} from './privateApiService'

const testimonyGetUrl = process.env.REACT_APP_API_TESTIMONY_GET
const testimonyPostUrl = process.env.REACT_APP_API_TESTIMONY_POST
const testimonyPutUrl = process.env.REACT_APP_API_TESTIMONY_PUT
const testimonyDeleteUrl = process.env.REACT_APP_API_TESTIMONY_DELETE

export const getTestimony = (id) => {
  return getPublicHandler(testimonyGetUrl, id)
}

export const postaTestimony = (id, bodydata) => {
  return postPrivateHandler(testimonyPostUrl, id, bodydata)
}

export const putTestimony = (id, bodydata) => {
  return putPrivateHandler(testimonyPutUrl, id, bodydata)
}

export const deleteTestimony = (id) => {
  return deletePrivateHandler(testimonyDeleteUrl, id)
}
