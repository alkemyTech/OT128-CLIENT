// import { getPublicHandler } from '../BaseHTTP/publicApiService'
import {
  postPrivateHandler,
  putPrivateHandler,
  deletePrivateHandler,
  getPrivateHandler,
} from '../BaseHTTP/privateApiService'
import { getPublicHandler } from '../BaseHTTP/publicApiService'

const memberGetUrl = process.env.REACT_APP_API_MEMBERS_GET
const memberPostUrl = process.env.REACT_APP_API_MEMBERS_POST
const memberPutUrl = process.env.REACT_APP_API_MEMBERS_PUT
const memberDeleteUrl = process.env.REACT_APP_API_MEMBERS_DELETE

export const getPublicMembers = () => {
  return getPublicHandler(memberGetUrl)
}

export const getMembers = (id) => {
  return getPrivateHandler(memberGetUrl, id)
}

export const postMembers = (id, bodydata) => {
  return postPrivateHandler(memberPostUrl, id, bodydata)
}

export const putMembers = (id, bodydata) => {
  return putPrivateHandler(memberPutUrl, id, bodydata)
}

export const deleteMembers = (id) => {
  return deletePrivateHandler(memberDeleteUrl, id)
}

export const searchMembers = (query) => {
  return getPrivateHandler(`${memberGetUrl}?search=${query}`)
}
