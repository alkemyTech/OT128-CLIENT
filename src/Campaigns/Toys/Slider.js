import { Box } from '@mui/material'
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import ItemSlider from '../ItemSlider'

const Slider = () => {
  const items = [
    {
      name: 'Imagen Campaña #1',
      text: 'Bienvenidos a nuestra campaña de recolección de juguetes!',
      image:
        'https://drive.google.com/uc?export=view&id=11f7CNIvmomFoAAFOvnuI5gqnyHIB5b8x',
    },
    {
      name: 'Imagen Campaña #2',
      text: 'Tu ayuda hace la diferencia para que los mas pequeños sean felices!',
      image:
        'https://drive.google.com/uc?export=view&id=1VogDd65eOHEIt-hyRpd-ysDf0SfTdWfs',
    },
    {
      name: 'Imagen Campaña #3',
      text: 'Ayudanos a construir un presente con niños felices',
      image:
        'https://drive.google.com/uc?export=view&id=1dgAJeb0r2GG-BIy3pink6mPda4KANZO6',
    },
  ]

  return (
    <Box sx={{ my: 2 }}>
      <Carousel
        interval="5000"
        animation="slide"
        duration="750"
        swipe={false}
        indicators={false}
      >
        {items.map((item, i) => (
          <ItemSlider key={i} item={item} />
        ))}
      </Carousel>
    </Box>
  )
}

export default Slider
