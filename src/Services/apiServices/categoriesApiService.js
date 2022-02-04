import { getPublicHandler } from '../BaseHTTP/publicApiService'
import {
  postPrivateHandler,
  putPrivateHandler,
  deletePrivateHandler,
} from './privateApiService'

const categoriesGetUrl = process.env.REACT_APP_API_CATEGORIES_GET
const categoriesPostUrl = process.env.REACT_APP_API_CATEGORIES_POST
const categoriesPutUrl = process.env.REACT_APP_API_CATEGORIES_PUT
const categoriesDeleteUrl = process.env.REACT_APP_API_CATEGORIES_DELETE

export const getCategories = (id) => {
  return getPublicHandler(categoriesGetUrl, id)
}

export const postCategories = (id, bodydata) => {
  return postPrivateHandler(categoriesPostUrl, id, bodydata)
}

export const putCategories = (id, bodydata) => {
  return putPrivateHandler(categoriesPutUrl, id, bodydata)
}

export const deleteCategories = (id) => {
  return deletePrivateHandler(categoriesDeleteUrl, id)
}
