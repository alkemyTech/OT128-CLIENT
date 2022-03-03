import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import { getOrganization } from './../../Services/apiServices/organizationApiService'
import { alertServiceError } from '../AlertService'
import Spinner from '../Spinner'
import NewsList from '../News/NewsList'
import { resetStatus } from '../../features/news/newsReducer'
import { useDispatch } from 'react-redux'
import { Title } from '../Title'
import TestimonialsList from '../Testimonials/TestimonialsList'

function Index() {
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState()
  const dispatch = useDispatch()

  useEffect(
    () =>
      (async () => {
        dispatch(resetStatus())
        setLoader(true)
        const response = await getOrganization()
        if (response.error) {
          alertServiceError(
            response.message,
            'No se pudo obtener la información solicitada',
          )
        }

        const organizationData = response.data?.data

        organizationData
          ? setData(organizationData)
          : alertServiceError(
              'No se pudo cargar la pagina',
              'Verificá que la URL sea correcta',
            )
        setLoader(false)
      })(),
    [dispatch],
  )
  return loader ? (
    <Spinner />
  ) : (
    <div>
      {data ? (
        <Title image={'/images/portada somos mas.png'}>
          {data.welcome_text}
        </Title>
      ) : null}
      <Container>
        <NewsList from="home" />
        <TestimonialsList from="home" />
      </Container>
    </div>
  )
}

export default Index
