import { Container } from '@mui/material'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import BackOfficeContent from './BackOfficeContent'
import HeaderBackoffice from './HeaderBackoffice'
import Footer from '../PublicWeb/Footer/Footer'

const BackOfficeHome = ({ children }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth)
  if (!isAuthenticated || role !== 'Admin') return <Redirect to="/" />
  return (
    <>
      <HeaderBackoffice />
      <Container sx={{ mb: 4, minHeight: '58vh' }}>
        <BackOfficeContent />
        {children}
      </Container>
      <Footer />
    </>
  )
}

export default BackOfficeHome
