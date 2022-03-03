import React from 'react'
import Header from './Header'
import Slider from './Slider'
import Content from './Content'
import Footer from './Footer'
import { Container } from '@mui/material'

const SchoolCampaign = () => {
  return (
    <>
      <Header />
      <Container>
        <Slider />
        <Content />
      </Container>
      <Footer />
    </>
  )
}

export default SchoolCampaign
