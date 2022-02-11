import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AppBar } from '@mui/material'

const drawerWidth = 220

const links = [
  {
    name: 'Actividades',
    path: '/backoffice/activities',
  },
  {
    name: 'Miembros',
    path: '/backoffice/members',
  },
  {
    name: 'Organización',
    path: '/backoffice/organization',
  },
  {
    name: 'Usuarios',
    path: '/backoffice/users',
  },
  {
    name: 'Catetegorías',
    path: '/backoffice/categories',
  },
]

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

export default function Sidebar() {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const history = useHistory()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    setOpen(false)
    console.log(history.location.pathname)
  }, [history.location.pathname])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        sx={{ backgroundColor: 'inherit', boxShadow: 'none' }}
        position="absolute"
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {links.map((link) => (
            <ListItem button key={link.name}>
              <Link
                to={link.path}
                style={{
                  textDecoration: 'none',
                  width: '100%',
                  color: 'inherit',
                }}
              >
                {link.name}
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  )
}