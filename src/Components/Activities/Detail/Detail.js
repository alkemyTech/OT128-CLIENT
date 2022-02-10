import React from 'react'
import { getPublicHandler } from '../../../Services/BaseHTTP/publicApiService'
import { Title } from '../../Title'
import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { SkeletonArticle } from './../../Skeleton/SkeletonArticle'
import { getActivity } from '../../../Services/apiServices/activitiesApiService'
import { alertServiceError } from '../../AlertService'

export const Detail = (props) => {
  const [data, setData] = useState(undefined)

  const url = process.env.REACT_APP_API_ACTIVITY_GET

  const {
    match: { params },
  } = props

  const { id } = params

  useEffect(() => {
    ;(async () => {
      const data = await getActivity(id)
      console.log(data)
      if (data.error) {
        alertServiceError(
          data.message,
          'Hubo un problema para recibir los datos, profavor intente denuevo mas tarde',
        )
      }
    })()

    // getPublicHandler(url, id).then(({ data }) => setData(data.data))

    // if (!data) {
    //   setTimeout(() => {
    //     setData('Error')
    //   }, 5000)
    // }
  }, [])

  return (
    <>
      {data ? (
        <>
          <Title children={data?.name} image={data?.image} />
          <Typography
            component={'span'}
            variant={'body2'}
            color="text.secondary"
          >
            {data?.description}
          </Typography>
        </>
      ) : (
        <SkeletonArticle />
      )}
    </>
  )
}
