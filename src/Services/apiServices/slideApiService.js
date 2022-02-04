import { getPublicHandler } from '../BaseHTTP/publicApiService'
import {
  postPrivateHandler,
  putPrivateHandler,
  deletePrivateHandler,
} from './privateApiService'

const slideGetUrl = process.env.REACT_APP_API_SLIDE_GET
const slidePostUrl = process.env.REACT_APP_API_SLIDE_POST
const slidePutUrl = process.env.REACT_APP_API_SLIDE_PUT
const slideDeleteUrl = process.env.REACT_APP_API_SLIDE_DELETE

export const getSlide = (id) => {
  return getPublicHandler(slideGetUrl, id)
}

export const postSlide = (id, bodydata) => {
  return postPrivateHandler(slidePostUrl, id, bodydata)
}

export const putSlide = (id, bodydata) => {
  return putPrivateHandler(slidePutUrl, id, bodydata)
}

export const deleteSlide = (id) => {
  return deletePrivateHandler(slideDeleteUrl, id)
}
