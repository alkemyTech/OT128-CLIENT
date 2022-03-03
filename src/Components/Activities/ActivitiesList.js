import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPublicActivities } from '../../features/activities/activitiesReducer'
import '../CardListStyles.css'
import parse from 'html-react-parser'
import { useBreakPoints } from '../../utils/hooks/useBreakPoints'
import { activitiesMokData, AllProjects } from './Pagination'

export const ActivitiesCard = ({ name, image, description, isMin }) => {
  let minWidth = isMin ? 390 : 330

  return (
    <Card
      sx={{
        minWidth: minWidth,
        maxWidth: minWidth,
        background: 'rgba(255,255,255,0.6)',
        boxShadow: 3,
        m: {xs:'1px', sm:3},
        mb: {xs:'10px', sm:3},
      }}
    >
      <CardMedia component="img" height="300" image={image} alt={name} />
      <CardContent>
        <Typography
          textAlign="center"
          gutterBottom
          variant="h5"
          component="div"
        >
          {name}
        </Typography>
        <Typography
          textAlign="center"
          component={'span'}
          variant={'body2'}
          color="text.secondary"
        >
          {description === null ? null : parse(String(description))}
        </Typography>
      </CardContent>
    </Card>
  )
}

const ActivitiesList = () => {
  const activities = useSelector((state) => state.activities.data)
  const dispatch = useDispatch()

  const isMatchMin = useBreakPoints('(max-width: 694px)')
  const isMatchRest = useBreakPoints('(min-width: 695px)')

  useEffect(() => {
    dispatch(getPublicActivities())
  }, [dispatch])

  return (
    <>
      <Box
        as="img"
        sx={{ width: '100vw', height: '45vh'}}
        src="/images/actividades1.jpg"
        alt="actividades"
      />
      <Typography variant="h2" textAlign="center" mt={1}>
        Actividades recientes
      </Typography>
      <Typography variant="h6" textAlign="center" p={2}>
        Enterate de nuestras últimas actividades
      </Typography>
      {isMatchMin && (
        <div>
          {activities.length > 0 ? (

            <AllProjects projectsList={activities}/>
          ) : (
            <p>No hay actividades</p>
          )}
        </div>
      )}

      {isMatchRest && (
        <div>
          {activities.length > 0 ? (

            <AllProjects projectsList={activities}/>
          ) : (
            <p>No hay actividades</p>
          )}
        </div>
      )}
    </>
  )
}

export default ActivitiesList
