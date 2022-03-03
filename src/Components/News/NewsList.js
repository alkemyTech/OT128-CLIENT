import React, { useState } from 'react'
import { useEffect } from 'react'
import { Box, Grid, Pagination, Stack, Typography } from '@mui/material'
import CustomCard from './../Card/CustomCard'
import { SkeletonArticle } from './../Skeleton/SkeletonArticle'
import { alertServiceError } from '../AlertService'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNew } from '../../features/news/newsReducer'

const NewsList = ({ from }) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.news)

  const [page, setPage] = useState(1)
  const handleChange = (event, value) => {
    setPage(value)
  }

  useEffect(() => {
    if (state.status === 'idle') {
      dispatch(fetchNew())
    }

    if (state.status === 'error') {
      alertServiceError(
        state.errorMsg,
        'Se produjo un error al intentar obtener datos de categorías',
      )
    }
  }, [state.status, dispatch, state.errorMsg])

  let sliceNews
  let startSlice
  switch (from) {
    case 'home':
      sliceNews = 3
      startSlice = 0
      break
    case 'newsHome':
      sliceNews = 6 * page
      startSlice = sliceNews - 6
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
              Ultimas novedades
            </Typography>
          </Box>
          <Grid
            style={{
              justifyContent: 'space-evenly',
              padding: '20px 0',
              marginBottom: '40px',
            }}
            container
            rows={{ xs: 1, sm: 8, md: 6 }}
            spacing={{ xs: 2, md: 3 }}
          >
            {state.news?.length ? (
              state.news?.slice(startSlice, sliceNews).map((element) => {
                return (
                  <Grid item key={element.id}>
                    <CustomCard
                      id={element.id}
                      image={element.image}
                      name={element.name}
                      description={element.content}
                      fecha={element.updated_at}
                      link="novedades"
                    />
                  </Grid>
                )
              })
            ) : (
              <Box sx={{ mt: 4 }}>
                <p>No hay novedades</p>
              </Box>
            )}

            {/* pagination only for newsHome  */}

            {from === 'newsHome' && (
              <Grid
                item
                xs={12}
                sx={{ justifyContent: 'center', display: 'flex' }}
              >
                <Stack spacing={2}>
                  <Pagination
                    color="primary"
                    count={Math.ceil(state.news?.length / 6)}
                    page={page}
                    onChange={handleChange}
                  />
                </Stack>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </>
  )
}

export default NewsList


