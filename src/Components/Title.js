import React from 'react'
// import defaultImage from '../assets/defaultImage.jpg'
import { Box } from '@mui/material'

export const Title = ({ children, image }) => {
  return (
    <Box>
      {/* <h1>{children}</h1> */}
      <Box sx={{ mt: 0 }}>
        <img width="100%" src={image || ''} alt={children} />
      </Box>
      <h1
        style={{ textAlign: 'center', marginBottom: '8rem', fontSize: '3rem' }}
      >
        {children}
      </h1>
    </Box>
  )
}
