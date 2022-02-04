import { getPublicHandler } from '../BaseHTTP/publicApiService'
import { postPrivateHandler, putPrivateHandler } from './privateApiService'

const organizationGetUrl = process.env.REACT_APP_API_ORGANIZATION_GET
const organizationPostUrl = process.env.REACT_APP_API_ORGANIZATION_POST
const organizationPutUrl = process.env.REACT_APP_API_ORGANIZATION_PUT

export const getOrganization = (id) => {
  return getPublicHandler(organizationGetUrl, id)
}

export const postOrganization = (id, bodydata) => {
  return postPrivateHandler(organizationPostUrl, id, bodydata)
}

export const putOrganization = (id, bodydata) => {
  return putPrivateHandler(organizationPutUrl, id, bodydata)
}
