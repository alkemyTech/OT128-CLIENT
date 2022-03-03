import React, { useEffect, useState } from 'react'
import { Box, Container, Grid } from '@mui/material'
import { getOrganization } from './../../Services/apiServices/organizationApiService'
import { alertServiceError } from '../AlertService'
import Spinner from '../Spinner'
import { Title } from '../Title'
import { MembersList } from '../Members/MembersList'
import { LinkedinFollowCompany } from 'react-social-plugins'
import { Helmet } from 'react-helmet'

const About = ({ title }) => {
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState()

  useEffect(
    () =>
      (async () => {
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
    [],
  )

  return loader ? (
    <Spinner />
  ) : (
    <>
      <Helmet>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        />
        <script
          src="https://platform.linkedin.com/in.js"
          type="text/javascript"
        >
          lang: es_AR
        </script>
      </Helmet>
      <img src="images/nosotros.png" width="100%" alt="nosotros" />
      <Container style={{ textAlign: 'center' }}>
        {/* <Title>Nosotros</Title> */}
        {/* <Box>
        </Box> */}
        <Grid container sx={{ my: '60px', width: '100%' }}>
          <Grid item sx={12} md={9}>
            <Box sx={{ textAlign: 'start', px: '30px' }}>
              <LinkedinFollowCompany
                companyId={3144678}
                counter="top"
                lang="es_AR"
              />
              <h3 style={{ margin: '15px 0' }}>{data?.welcome_text}</h3>
              {/* <p style={{ margin: '35px 0' }}>{data?.long_description}</p> */}
              <p style={{ margin: '15px 0' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                vel placerat nisi. Proin aliquam finibus nulla eget vehicula.
                Aliquam sodales semper porta. Quisque aliquet felis ante, vitae
                accumsan erat ultricies a. Ut iaculis velit urna, mattis
                bibendum sem congue elementum. Duis tempus odio ut purus
                ullamcorper aliquam. In vehicula justo in lacus molestie
                bibendum. Nulla ipsum leo, congue et feugiat in, pellentesque a
                lorem.
              </p>
              <p style={{ margin: '15px 0' }}>
                Duis id orci nisl. Duis aliquam rutrum felis vel pretium. Donec
                vestibulum urna et augue dignissim, id hendrerit dui aliquet.
                Morbi finibus tellus tellus, vel venenatis ex hendrerit a. Morbi
                ac consectetur nulla. Aliquam efficitur, odio non sagittis
                condimentum, arcu ipsum luctus nibh, vitae vehicula turpis metus
                a purus. Maecenas ac turpis sed metus pulvinar lobortis non quis
                arcu. Sed ut leo nec arcu semper auctor. Integer aliquet sed
                justo posuere tempor. Quisque augue urna, vulputate vitae purus
                a, viverra dictum neque. Proin commodo felis nec nibh varius
                pulvinar. Vivamus scelerisque massa eget justo luctus aliquet.
                In euismod lacinia tempor. Sed interdum purus at mollis
                condimentum. Aenean neque mauris, gravida sit amet felis eu,
                interdum viverra arcu. Aliquam tellus est, sodales eu ipsum
                tincidunt, malesuada viverra ex.
              </p>
              <p style={{ margin: '15px 0' }}>
                In vel lectus sapien. Morbi porta odio tristique, aliquam eros
                vel, dapibus erat. Morbi consectetur pulvinar nulla vitae
                scelerisque. Quisque mauris ante, porttitor sit amet hendrerit
                vitae, congue non est. Duis vestibulum tortor eu tellus finibus
                egestas. Sed sed ligula rutrum, maximus odio ut, efficitur
                nulla. Praesent sed ultrices eros. Proin facilisis ultricies
                orci vel hendrerit. Morbi gravida non nunc at scelerisque.
                Aliquam auctor sed erat at blandit. Nunc sollicitudin est vitae
                ligula venenatis laoreet. Donec at metus pulvinar, rhoncus leo
                vitae, dapibus odio.
              </p>
            </Box>
          </Grid>
          <Grid item sx={12} md={3}>
            <div style={{ padding: '25px', margin: 'auto' }}>
              <a
                className="twitter-timeline"
                data-lang="es"
                // data-width="1000"
                data-height="600"
                data-dnt="true"
                data-theme="light"
                href="https://twitter.com/somosmas?ref_src=twsrc%5Etfw"
              >
                Tweets by somosmas
              </a>{' '}
              <script
                async
                src="https://platform.twitter.com/widgets.js"
                charSet="utf-8"
              ></script>
            </div>
          </Grid>
        </Grid>
        <MembersList />
      </Container>
    </>
  )
}

export default About
