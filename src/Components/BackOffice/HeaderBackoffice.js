import React from 'react'
import { useMediaQuery, createTheme, AppBar, Box } from '@material-ui/core'
import Sidebar from './BackOfficeSidebar'
import { Link } from 'react-router-dom'

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
    <Box sx={{ flexGrow: 1, boxShadow: 0, mt: '-4.4rem' }}>
      <AppBar
        position="relative"
        style={{
          background: isMatchDesktop ? 'rgba(7,34,39,0.7)' : 'rgb(7,34,39)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '.5rem',
        }}
      >
        <Link to="/">
          <Box
            component="img"
            sx={{
              height: 60,
              ml: isMatchDesktop ? 0 : 'auto',
              mr: isMatchDesktop && 0,
              p: 1,
              paddingLeft: '18px',
            }}
            alt="Logo ong."
            src="/images/logo-bco.png"
          />
        </Link>
        <Sidebar />
      </AppBar>
    </Box>
  )
}
export default HeaderBackoffice
