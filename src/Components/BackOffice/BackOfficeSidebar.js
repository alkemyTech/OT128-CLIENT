import { styled, useTheme } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@mui/material'

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
    name: 'Categorías',
    path: '/backoffice/categories',
  },
  {
    name: 'Novedades',
    path: '/backoffice/news',
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
  const location = useLocation()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ mr: 2, ...open }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="temporary"
        anchor="right"
        open={open}
        // onBlur={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {links.map((link) => (
            <ListItem key={link.name} style={{ padding: '0' }}>
              <Button
                component={Link}
                to={link.path}
                style={{
                  textDecoration: 'none',
                  width: '100%',
                  color: 'inherit',
                  padding: '10px 15px',
                }}
              >
                {link.name}
              </Button>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}
