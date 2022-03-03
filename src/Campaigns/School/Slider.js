import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import ItemSlider from '../ItemSlider'

const Slider = () => {
  const items = [
    {
      name: 'Imagen Campaña #1',
      text: 'Bienvenido a nuestra campaña de utiles escolares!',
      image:
        'https://drive.google.com/uc?export=view&id=1qEqvRfz1jifFZlAySvPcto7ajvpcMwlC',
    },
    {
      name: 'Imagen Campaña #2',
      text: 'Brindamos el apoyo escolar que muchos de nuestros niños necesitan',
      image:
        'https://drive.google.com/uc?export=view&id=1N5x1Fw7IVcbHtw7AJF0-weg-HhXTekoF',
    },
    {
      name: 'Imagen Campaña #3',
      text: 'Colectivamente vamos a lograr avances culturales',
      image:
        'https://drive.google.com/uc?export=view&id=1EfWmYnA2R49ZW8anbMT9Hg2J02pVT5D9',
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
