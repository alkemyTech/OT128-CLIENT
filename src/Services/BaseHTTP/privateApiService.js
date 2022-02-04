import axios from 'axios'

const token = localStorage.getItem('token')

const apiService = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

if (token) {
  apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const getPrivateHandler = (apiEndpoint, id) => {
  const apiServiceUrl = id ? `${apiEndpoint}/${id}` : `${apiEndpoint}`
  return apiService.get(apiServiceUrl).catch((err) => console.log(err))
}
export const postPrivateHandler = (apiEndpoint, bodyData) => {
  return apiService.post(apiEndpoint, bodyData).catch((err) => console.log(err))
}

// Id obligatory
export const deletePrivateHandler = (apiEndpoint, id) => {
  if (!id) return 'error-no-id'
  const apiServiceUrl = `${apiEndpoint}/${id}`
  return apiService.post(apiServiceUrl).catch((err) => console.log(err))
}
// Id obligatory
export const putPrivateHandler = (apiEndpoint, id, bodyData) => {
  if (!id) return 'error-no-id'
  const apiServiceUrl = `${apiEndpoint}/${id}`
  return apiService
    .post(apiServiceUrl, bodyData)
    .catch((err) => console.log(err))
}
// Id obligatory
export const patchPrivateHandler = (apiEndpoint, id, bodyData) => {
  if (!id) return 'error-no-id'
  const apiServiceUrl = `${apiEndpoint}/${id}`
  return apiService
    .post(apiServiceUrl, bodyData)
    .catch((err) => console.log(err))
}
