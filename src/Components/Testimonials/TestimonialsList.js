import React from 'react'
import { useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import CustomCard from './../Card/CustomCard'
import { SkeletonArticle } from './../Skeleton/SkeletonArticle'
import { alertServiceError } from '../AlertService'
import { useDispatch, useSelector } from 'react-redux'
import { getTestimonial } from '../../features/testimonial/testimonialReducer'

const TestimonialsList = ({ from }) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.testimonial)

  useEffect(() => {
    if (state.status === 'idle') {
      dispatch(getTestimonial())
    }

    if (state.status === 'error') {
      alertServiceError(
        state.errorMsg,
        'Se produjo un error al intentar obtener datos de categorías',
      )
    }
  }, [state.status, dispatch, state.errorMsg])

  let sliceTestimonials
  switch (from) {
    case 'home':
      sliceTestimonials = state.testimonials?.length - 3
      break
    case 'TestimonialsHome':
      sliceTestimonials = state.testimonials?.length
      break
    default:
      break
  }

  return (
    <>
      {state.loader ? (
        <SkeletonArticle />
      ) : (
        <>
          {' '}
          <Box sx={{ pb: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom component="div">
              Testimonios
            </Typography>
          </Box>
          <Grid
            sx={{ justifyContent: 'space-evenly', mb: '100px' }}
            container
            rows={{ xs: 1, sm: 8, md: 6 }}
            spacing={{ xs: 2, md: 3 }}
          >
            {state.testimonials?.length ? (
              state.testimonials?.slice(sliceTestimonials).map((element) => {
                return (
                  <Grid item key={element.id}>
                    <CustomCard
                      id={element.id}
                      image={element.image}
                      name={element.name}
                      description={element.content}
                      link="testimonios"
                    />
                  </Grid>
                )
              })
            ) : (
              <Box sx={{ mt: 4 }}>
                <p>No hay testimonios</p>
              </Box>
            )}
          </Grid>
        </>
      )}
    </>
  )
}

export default TestimonialsList
