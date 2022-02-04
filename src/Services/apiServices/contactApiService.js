import { getPublicHandler } from '../BaseHTTP/publicApiService'
import {
  postPrivateHandler,
  putPrivateHandler,
  deletePrivateHandler,
} from './privateApiService'

const contactGetUrl = process.env.REACT_APP_API_CONTACT_GET
const contactPostUrl = process.env.REACT_APP_API_CONTACT_POST
const contactPutUrl = process.env.REACT_APP_API_CONTACT_PUT
const contactDeleteUrl = process.env.REACT_APP_API_CONTACT_DELETE

export const getContact = (id) => {
  return getPublicHandler(contactGetUrl, id)
}

export const postContact = (id, bodydata) => {
  return postPrivateHandler(contactPostUrl, id, bodydata)
}

export const putContact = (id, bodydata) => {
  return putPrivateHandler(contactPutUrl, id, bodydata)
}

export const deleteContact = (id) => {
  return deletePrivateHandler(contactDeleteUrl, id)
}
