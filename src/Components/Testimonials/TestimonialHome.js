import { Container, Grid, Pagination, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../CardListStyles.css'
import { getTestimonial } from '../../features/testimonial/testimonialReducer'
import { TestimonialGrid } from './TestimonialGrid'
import { SkeletonArticle } from '../Skeleton/SkeletonArticle'

const TestimonialHome = () => {
  const testimonialState = useSelector(
    (state) => state.testimonial.testimonials,
  )
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const handleChange = (event, value) => {
    setPage(value)
  }
  const sliceTestimonials = 6 * page
  const startSlice = sliceTestimonials - 6

  useEffect(() => {
    dispatch(getTestimonial())
  }, [dispatch])

  return (
    <>
      <img src="/images/testimonios.png" alt="testomonios" width="100%" />
      <Typography variant="h3" textAlign="center" mt={5}>
        Testimonios
      </Typography>
      {testimonialState?.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 550px))',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          {testimonialState?.length > 0 ? (
            testimonialState
              .slice(startSlice, sliceTestimonials)
              .map((testimony, index) => {
                return (
                  <Container>
                    <TestimonialGrid
                      id={testimony.id}
                      link="testimonios"
                      name={testimony.name}
                      image={testimony.image}
                      description={testimony.description}
                      key={index}
                    />
                  </Container>
                )
              })
          ) : (
            <p style={{ textAlign: 'center' }}>No se encontraron testimonios</p>
          )}
        </div>
      ) : (
        <SkeletonArticle />
      )}
      <Grid
        Item
        xs={12}
        sx={{ justifyContent: 'center', display: 'flex', mb: 3 }}
      >
        <Stack spacing={2}>
          <Pagination
            color="primary"
            count={Math.ceil(testimonialState?.length / 6)}
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </Grid>
    </>
  )
}

export default TestimonialHome
