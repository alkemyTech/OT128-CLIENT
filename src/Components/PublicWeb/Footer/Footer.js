import { Box, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import style from './Footer.module.css'
import Facebook from '@material-ui/icons/Facebook'
import Twitter from '@material-ui/icons/Twitter'
import Instagram from '@material-ui/icons/Instagram'
import LinkedIn from '@material-ui/icons/LinkedIn'

import { useSelector, useDispatch } from 'react-redux'
import { getOrganizationData } from '../../../features/organization/organizationReducer'

import { FooterSuscribe } from '../../FooterSuscribe/FooterSuscribe'

function Footer() {
  const isUserSubscribe = localStorage.getItem('isUserSubscribe')

  const [userSubscribe, setUserSubscribe] = useState(isUserSubscribe)

  const { data } = useSelector((state) => state.organization)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrganizationData())
  }, [])

  return (
    <>
      <div className={style.container}>
        <Grid container className={style.footer__container}>
          <Grid
            container
            alignItems="center"
            className={style.center}
            style={{ justifyContent: 'space-evenly' }}
          >
            <Link to={'/'}>
              <img
                alt="Logo ong."
                src="/images/logo-bco.png"
                className={style.logo}
              />
            </Link>
            <Grid className={(style.col, style.linksCol)}>
              <Link to="/campaign" className={style.col}>
                <p className={style.col__title}>
                  Ingresar a Campaña Escolar y Campaña de Juguetes
                </p>
              </Link>
            </Grid>
          </Grid>
          <Grid className={style.social}>
            <Box className={style.social__tags}>
              <a className={style.social__icon} href={data.facebook_url}>
                <Facebook size="2x" />
                <span>Somos_Más</span>
              </a>
              <a className={style.social__icon} href={data.twitter_url}>
                <Twitter size="2x" />
                <span>Somos_Más_Arg</span>
              </a>
              <a className={style.social__icon} href={data.instagram_url}>
                <Instagram size="2x" />
                <span>SomosMás</span>
              </a>
              <a className={style.social__icon} href={data.linkedin_url}>
                <LinkedIn size="2x" />
                <span>SomosMás</span>
              </a>
            </Box>
            {!userSubscribe ? (
              <FooterSuscribe setUserSubscribe={setUserSubscribe} />
            ) : (
              <h4 className={style.h4Text}>
                ¡ Gracias ! Ya estas suscrito a las novedades.
              </h4>
            )}
            <div className={style.social__copyrights}>
              © 2020 Somos mas. All Rights Reserved.
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Footer
