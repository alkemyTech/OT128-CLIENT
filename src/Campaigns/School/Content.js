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
            <AccessTimeIcon /> <span>17:00</span>
          </div>
          <div>
            <PlaceIcon /> <span>Calle falsa 1234</span>
          </div>
        </Paper>
      </Grid>
      <Grid style={{ padding: '20px' }} item xs={12} md={5}>
        <main>
          <p>
            Apostamos a la superación individual pero también colectiva. A
            través de la mejor herramienta que es la educación. Sabemos que tu
            ayuda nos beneficia a todos. Especialmente a los más vulnerables.
            Evitando que la marginalidad económica sea un obstáculo para la
            evolución de cada persona. Estamos totalmente convencidos que la
            salida es por ésta vía. Por eso nos vemos en la obligación de
            encontrar alternativas para construir. Porque solo juntos vamos a
            avanzar juntos en igualdad de condiciones.. Porque sólo
            colectivamente vamos a lograr avances culturales, que en definitiva
            son los valores más preciados y los que más rédito como sociedad nos
            favorecen. Te agredecemos de antemano por haber tomado un poco de tu
            tiempo en unirte a nosotros. Y a esta campaña de Ayuda escolar.
          </p>
          <p>
            La solidaridad es un acto de dignidad, no es caridad, no se da desde
            arriba, es un acto fraternal en un igualdad de condiciones. Y
            necesitamos empatía para salir de falsos dilemas. Estamos juntos en
            ésto. Y nos llena de satisfacción saber que entendés nuestra
            posición. Caminemos juntos hacia un futuro mejor.
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
                backgroundImage: 'url("/images/campaña_escolar_1.jpg")',
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
                backgroundImage: 'url("/images/campaña_escolar_2.jpg")',
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
          <Timer date="2022-03-05T17:00:00.000000Z" />
        </Grid>
      )}
    </Grid>
  )
}

export default Content
