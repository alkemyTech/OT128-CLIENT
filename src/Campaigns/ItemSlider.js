import React, { useEffect, useState } from 'react'
import { Paper, Typography } from '@mui/material'
import { useBreakPoints } from '../utils/hooks/useBreakPoints'

const ItemSlider = ({ item }) => {
  const { image, text } = item

  const isMatchSmartTv = useBreakPoints('(min-width: 1536px)')
  const isMatchDesktop = useBreakPoints('(min-width: 1200px)')
  const isMatchTablet = useBreakPoints('(min-width: 600px)')

  const startHeight = () => {
    const WindowWidth = window.innerWidth
    if (WindowWidth >= 1536) {
      return '110vh'
    } else if (WindowWidth < 1536 && WindowWidth >= 1200) {
      return '80vh'
    } else if (WindowWidth < 1200 && WindowWidth >= 600) {
      return '65vh'
    } else if (WindowWidth < 600) {
      return '40vh'
    }
  }

  const [height, setHeight] = useState(startHeight())

  // Inside this useEffect the size of the image is set
  useEffect(() => {
    setHeight(startHeight())
  }, [isMatchSmartTv, isMatchDesktop, isMatchTablet])

  return (
    <Paper>
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: height,
          width: '100%',
          display: 'flex',
        }}
      />
      <Typography
        sx={{
          py: 2,
          textAlign: 'center',
          display: { xs: 'none', lg: 'block' },
        }}
        variant="h5"
      >
        {text}
      </Typography>
    </Paper>
  )
}

export default ItemSlider
