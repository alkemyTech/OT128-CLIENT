import axios from 'axios'

const apiService = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

export const getPublicHandler = (apiEndpoint, id) => {
  const apiServiceUrl = id ? `${apiEndpoint}/${id}` : `${apiEndpoint}`
  return apiService.get(apiServiceUrl).catch((err) => console.log(err))
}
export const postHandler = (apiEndpoint, bodyData) => {
  return apiService.post(apiEndpoint, bodyData).catch((err) => console.log(err))
}

// Id obligatory
export const deletePublicHandler = (apiEndpoint, id) => {
  if (!id) return 'error-no-id'
  const apiServiceUrl = `${apiEndpoint}/${id}`
  return apiService.post(apiServiceUrl).catch((err) => console.log(err))
}
// Id obligatory
export const putPublicHandler = (apiEndpoint, id, bodyData) => {
  if (!id) return 'error-no-id'
  const apiServiceUrl = `${apiEndpoint}/${id}`
  return apiService
    .post(apiServiceUrl, bodyData)
    .catch((err) => console.log(err))
}
// Id obligatory
export const patchPublicHandler = (apiEndpoint, id, bodyData) => {
  if (!id) return 'error-no-id'
  const apiServiceUrl = `${apiEndpoint}/${id}`
  return apiService
    .post(apiServiceUrl, bodyData)
    .catch((err) => console.log(err))
}
