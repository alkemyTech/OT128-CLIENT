import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import styles from './Header.module.css'
import logo from './logo-letras-blancas.png'
import { arrayData } from './data'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../../../features/auth/authReducer'

const Header = () => {
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const userAuth = useSelector((state) => state.auth.isAuthenticated)
  const role = useSelector((state) => state.auth.role)
  let arrayDataAdmin = []

  if (role === 'Admin')
    arrayDataAdmin = arrayData.filter((data) => {
      return data.pathName !== 'Contacto'
    })

  return (
    <div id="main-header">
      <NavBar
        toggle={toggle}
        userAuth={userAuth}
        dispatch={dispatch}
        role={role}
        arrayDataToShow={
          arrayDataAdmin.length !== 0 ? arrayDataAdmin : arrayData
        }
      />
      <SideBar
        toggle={toggle}
        isOpen={isOpen}
        userAuth={userAuth}
        role={role}
        dispatch={dispatch}
        arrayDataToShow={
          arrayDataAdmin.length !== 0 ? arrayDataAdmin : arrayData
        }
      />
    </div>
  )
}

export default Header

const NavBar = ({
  toggle,
  pathname,
  userAuth,
  dispatch,
  role,
  arrayDataToShow,
}) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link className={styles.navLogoLink} to="/">
          <img src={logo} className={styles.navLogo} alt="logo" />
        </Link>

        <div className={styles.mobileIcon}>
          <FaBars onClick={toggle} />
        </div>

        <ul className={styles.navMenu}>
          {arrayDataToShow.map((link, key) => (
            <li
              className={` ${styles.navItem}  ${
                pathname === link.path ? styles.navLinksActive : ''
              }`}
              key={key}
            >
              <Link className={styles.navLinks} to={link.path}>
                {link.pathName}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.navBtn}>
          {role !== 'Admin' ? (
            <Link
              className={styles.navDonationLinkHeader}
              to="/donations"
            ></Link>
          ) : null}
          {userAuth ? (
            <>
              <Link
                onClick={() => dispatch(userLogout())}
                className={styles.navBtnLink}
                to={'/'}
              >
                Cerrar Sesión
              </Link>
              {role !== 'Admin' ? null : (
                <Link className={styles.navBtnLink} to={'/backoffice'}>
                  BackOffice
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to={'/login'} className={styles.navBtnLink}>
                Iniciar Sesión
              </Link>
              <Link to={'/register'} className={styles.navBtnLink}>
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

const SideBar = ({
  toggle,
  isOpen,
  userAuth,
  role,
  dispatch,
  arrayDataToShow,
}) => (
  <aside
    className={styles.sidebarContainer}
    style={
      isOpen ? { opacity: '100%', top: '0' } : { opacity: '0', top: '-100%' }
    }
    onClick={toggle}
  >
    <div className={styles.icon}>
      <FaTimes className={styles.closeIcon} />
    </div>

    <div className={styles.sidebarWrapper}>
      <ul className={styles.sidebarMenu}>
        {arrayDataToShow.map((link, key) => (
          <li className={styles.sidebarLink} key={key}>
            <Link className={styles.sidebarLink} to={link.path}>
              {link.pathName}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.sidebarBtnWrap}>
        {role !== 'Admin' ? (
          <Link className={styles.navDonationLink} to="/donations"></Link>
        ) : null}
        {userAuth ? (
          <>
            <Link
              onClick={() => dispatch(userLogout())}
              className={styles.sidebarRoute}
              to={'/'}
            >
              Cerrar Sesión
            </Link>
            {role !== 'Admin' ? null : (
              <Link className={styles.sidebarRoute} to={'/backoffice'}>
                BackOffice
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to={'/login'} className={styles.sidebarRoute}>
              Iniciar Sesión
            </Link>
            <Link to={'/register'} className={styles.sidebarRoute}>
              Registrarse
            </Link>
          </>
        )}
      </div>
    </div>
  </aside>
)
