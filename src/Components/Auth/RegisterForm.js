import React, { useState } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { debounce } from 'lodash'

import { FormTextInput as TextInput } from './VisualComponents/Inputs'
import RegisterMap from './RegisterMap'

import { Link as RouterLink, Redirect } from 'react-router-dom'

import { userRegister } from './../../features/auth/authReducer'
import { useDispatch, useSelector } from 'react-redux'

export default function RegisterForm() {
  const authData = useSelector(({ auth }) => auth)

  if (authData.isAuthenticated) {
    return <Redirect to="/" />
  }

  return <FormLogic />
}

const FormLogic = () => {
  const [ubication, setUbication] = useState('Argentina')

  const classes = useStyles()

  const dispatch = useDispatch()

  const hanldeUbication = debounce((value) => {
    setUbication(value)
  }, 1500)

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
      }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.intro}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrarse
          </Typography>
        </div>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            map: '',
            mailerConsent: false,
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('Campo obligatorio'),

            email: Yup.string()
              .email('Correo electrónico incorrecto')
              .required('Campo obligatorio'),

            password: Yup.string()
              .required('Campo obligatorio')
              .matches(
                /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&.*])(?=.{6,})/,
                'La contraseña debe tener una longitud mínima de 6 caracteres, y contener al menos un número, una letra y un símbolo (por ejemplo: @#$%)',
              ),

            confirmPassword: Yup.string()
              .required('Campo obligatorio')
              .oneOf(
                [Yup.ref('password'), null],
                'La contraseñas no coinciden',
              ),

            direction: Yup.string().required('Campo obligatorio'),
          })}
          onSubmit={(values) => {
            const { name, email, password } = values
            dispatch(userRegister({ name, email, password }))
          }}
        >
          {({ handleChange }) => (
            <Form className={classes.form} noValidate>
              <TextInput
                variant="outlined"
                margin="normal"
                fullWidth
                id="name"
                label="Nombre"
                name="name"
                autoFocus
              />

              <TextInput
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
              />
              <TextInput
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
              />
              <TextInput
                variant="outlined"
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Confirmar contraseña"
                type="password"
                id="confirmPassword"
              />

              <TextInput
                variant="outlined"
                margin="normal"
                fullWidth
                id="direction"
                label="Dirección"
                name="direction"
                onChange={(e) => {
                  hanldeUbication(e.target.value)
                }}
              />
              <RegisterMap text={ubication} />
              <div className={classes.submitContainer}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Registrarse
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <Link component={RouterLink} to="/login">
          {'Ya tiene una cuenta? Ingrese'}
        </Link>
      </div>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submitContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  intro: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '1rem',
  },
}))
