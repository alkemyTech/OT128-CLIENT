import {
  Box,
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOrganization } from '../../Services/apiServices/organizationApiService'
import Spinner from '../Spinner'

const OrganizationScreen = () => {
  const [responseServer, setResponseServer] = useState(undefined)

  useEffect(() => {
    ;(async () => {
      const response = await getOrganization()
      setResponseServer(response.data)
    })()
  }, [])

  return (
    <>
      {responseServer ? (
        <Container
          sx={{
            width: '100%',
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ m: 2 }}>
            <Card
              sx={{
                boxShadow: 5,
                maxWidth: 800,
                minHeight: 300,
                marginRight: 'auto',
                marginLeft: 'auto',
              }}
            >
              <CardMedia
                sx={{
                  maxWidth: '30%',
                  marginRight: 'auto',
                  marginLeft: 'auto',
                }}
                component="img"
                image={responseServer.data.logo}
                alt={responseServer.data.name}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h3"
                  component="div"
                  align="center"
                >
                  {responseServer.data.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {responseServer.data.short_description}
                </Typography>
              </CardContent>
              <CardActions>
                <Box>
                  <Link
                    style={{ textDecoration: 'none' }}
                    to="/backoffice/organization/edit"
                  >
                    <Button variant="contained" color="success">
                      Editar
                    </Button>
                  </Link>
                </Box>
              </CardActions>
            </Card>
          </Box>
        </Container>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default OrganizationScreen
