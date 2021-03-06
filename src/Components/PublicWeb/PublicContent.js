import Footer from './Footer/Footer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getUserRole } from '../../features/auth/authReducer'
import Header from './Header/Header'
// import './Footer/Footer.css'

const PublicContent = ({ children }) => {
  const { isAuthenticated, role, user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  if (isAuthenticated) {
    if (!role) dispatch(getUserRole(user.role_id))
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default PublicContent
