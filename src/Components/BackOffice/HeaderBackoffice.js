import React from 'react'
import {
  useMediaQuery,
  createTheme,
  AppBar,
  Box,
  Toolbar,
  
  
} from '@material-ui/core'
import ButtonMenuBackOffice from './ButtonMenuBackOffice'


const HeaderBackoffice = () => {
  // Breakpoints
  const theme = createTheme({
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1200,
      },
    },
  })

  // const isMatchTablet = useMediaQuery(theme.breakpoints.up('tablet'))
  // const isMatchLaptop = useMediaQuery(theme.breakpoints.up('laptop'))
  const isMatchDesktop = useMediaQuery(theme.breakpoints.up('desktop'))

  return (
    <Box sx={{ flexGrow: 1, boxShadow: 0 }}>
      <AppBar
        position="static"
        style={{
          background: isMatchDesktop ? 'rgba(53,133,139,0.7)' : 'rgb(7,34,39)',
        }}
      >
        <Toolbar>
          <Box
            component="img"
            sx={{
              width: 108,
              height: 53,
              m: 'auto',
              p: 1,
            }}
            alt="Logo ong."
            src="/images/logo-letras-blancas.png"
          />
          <ButtonMenuBackOffice>Menu</ButtonMenuBackOffice>
        </Toolbar>
         </AppBar>
    </Box>
  )
}
export default HeaderBackoffice