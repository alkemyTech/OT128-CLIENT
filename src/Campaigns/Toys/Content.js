import { Box, createTheme, Grid, Paper, useMediaQuery } from '@material-ui/core'
import React from 'react'
import Timer from '../../Components/Countdown/Timer'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PlaceIcon from '@mui/icons-material/Place'
import '../Content.css'

const Content = () => {
  const theme = createTheme({
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1200,
        smartTv: 1500,
      },
    },
  })

  const isMatchTablet = useMediaQuery(theme.breakpoints.up('tablet'))
  const isMatchLaptop = useMediaQuery(theme.breakpoints.up('laptop'))
  // const isMatchDesktop = useMediaQuery(theme.breakpoints.up('desktop'))
  const isTV = useMediaQuery(theme.breakpoints.up('smartTv'))

  return (
    <Grid
      container
      spacing={1}
      style={{ background: isTV && 'rgba(7, 34, 39, .1)' }}
      id="grid-campaign"
    >
      <Grid item xs={12}>
        <Paper elevation={5} className="date-container">
          <div>
            <CalendarTodayIcon /> <span>5 de marzo</span>
          </div>
          <div>
            <AccessTimeIcon /> <span>20:00</span>
          </div>
          <div>
            <PlaceIcon /> <span>Av siempre viva 123</span>
          </div>
        </Paper>
      </Grid>
      <Grid style={{ padding: '20px' }} item xs={12} md={5}>
        <main>
          <p>
            Es indudable la importancia del juego en el desarrollo del niño, no
            sólo por su carácter lúdico sino también por sus aportaciones a las
            distintas áreas del desarrollo. Al jugar el niño pone en marcha
            muchas habilidades cognitivas, motoras, sociales y emocionales, al
            tiempo que se divierte. El juego le permite al niño conocerse más a
            sí mismo y también, a través de él, conoce el mundo que le rodea.
          </p>
          <p>
            Jugando, el niño/a aprende porque obtiene nuevas experiencias,
            porque es una oportunidad de cometer aciertos y errores, de aplicar
            sus conocimientos y de resolver problemas. El juego estimula el
            desarrollo de las capacidades de pensamiento, de la creatividad
            infantil, y crea zonas potenciales de aprendizaje.
          </p>
          <p>
            En el plano intelectual, el desarrollo del juego de simulación o
            ficción incorpora muchas tendencias del desarrollo cognitivo, todas
            ellas relacionadas con el desarrollo de un pensamiento menos
            concreto y más coordinado.
          </p>
          <p>
            A través del juego nuestros hijos toman conciencia de sí mismos y
            del mundo que les rodea. Jugar contribuye su bienestar físico,
            emocional, cognitivo y social. A nivel fisico, el juego contribuye
            al: Aprendizaje y desarrollo de las habilidades motrices básicas:
            andar, correr, saltar, girar, tomar y lanzar.
          </p>
        </main>
      </Grid>
      {isMatchLaptop && (
        <Grid item xs={12} md={7}>
          {/* Hide on mobile & tablet */}
          <section id="gallery-campaign">
            <Box
              boxShadow={5}
              style={{
                height: '50vh',
                width: '100%',
                padding: '20px',
                backgroundImage: 'url("/images/campaña_juguetes_1.jpg")',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            />
            <Box
              boxShadow={5}
              style={{
                height: '50vh',
                width: '100%',
                padding: '20px',
                backgroundImage: 'url("/images/campaña_juguetes_2.jpg")',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            />
          </section>
        </Grid>
      )}
      {isMatchTablet && (
        <Grid item xs={12} style={{ padding: '50px 0' }}>
          <Timer date="2022-03-05T20:00:00.000000Z" />
        </Grid>
      )}
    </Grid>
  )
}

export default Content
