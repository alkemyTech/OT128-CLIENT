import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CampaignSelect.module.css'

const CampaignSelect = () => {
  return (
    <Container sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h2">Bienvenido a nuestras campañas!</Typography>
      <Typography variant="button" display="block" gutterBottom>
        Pulsa las imagenes para enterarte mas acerca de nuestras campañas
      </Typography>
      <Box sx={{ mt: 7 }}>
        <Link to="/school-campaign">
          <img
            className={styles.imgcard}
            width="100%"
            src="/images/campaña numero 1.png"
            alt=""
          />
        </Link>
      </Box>
      <Box sx={{ mt: 10 }}>
        <Link to="/toys-campaign">
          <img
            className={styles.imgcard}
            width="100%"
            src="/images/campaña numero 2.png"
            alt=""
          />
        </Link>
      </Box>
    </Container>
  )
}

export default CampaignSelect
