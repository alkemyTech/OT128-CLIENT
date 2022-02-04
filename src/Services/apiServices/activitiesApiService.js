import { getPublicHandler } from '../BaseHTTP/publicApiService'
import {
  postPrivateHandler,
  putPrivateHandler,
  deletePrivateHandler,
} from './privateApiService'

const activityGetUrl = process.env.REACT_APP_API_ACTIVITY_GET
const activityPostUrl = process.env.REACT_APP_API_ACTIVITY_POST
const activityPutUrl = process.env.REACT_APP_API_ACTIVITY_PUT
const activityDeleteUrl = process.env.REACT_APP_API_ACTIVITY_DELETE

export const getActivity = (id) => {
  return getPublicHandler(activityGetUrl, id)
}

export const postActivity = (id, bodydata) => {
  return postPrivateHandler(activityPostUrl, id, bodydata)
}

export const putActivity = (id, bodydata) => {
  return putPrivateHandler(activityPutUrl, id, bodydata)
}

export const deleteActivity = (id) => {
  return deletePrivateHandler(activityDeleteUrl, id)
}
