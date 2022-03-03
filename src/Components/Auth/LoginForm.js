import React from 'react'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import { Link as RouterLink, Redirect } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from './../../features/auth/authReducer'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorText: {
    color: '#de1b1b',
    fontSize: '16px',
  },
}))

export default function LoginForm() {
  const authData = useSelector(({ auth }) => auth)

  const classes = useStyles()

  if (authData.isAuthenticated) {
    return <Redirect to="/" />
  }

  return <FormLogic classes={classes} authData={authData} />
}

export const FormLogic = ({ classes, authData }) => {
  const dispatch = useDispatch()

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2rem',
        }}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingresar
          </Typography>
          <Formik
            initialValues={{
              email: '',
              password: '',
              rememberUser: false,
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Ingrese un email correcto')
                .required('Ingrese un email correcto'),
              password: Yup.string().required(
                'Ingrese una contraseña correcta',
              ),
            })}
            onSubmit={(values) => {
              const { email, password } = values
              const data = { email: email, password: password }
              dispatch(userLogin(data))
            }}
          >
            <Form>
              <Field name="email">
                {({ field, meta }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Correo electrónico"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    inputProps={{ ...field }}
                    error={meta.touched && typeof meta.error !== 'undefined'}
                  />
                )}
              </Field>
              <ErrorMessage name="email">
                {(msg) => (
                  <span style={{ color: '#de1b1b', fontSize: '16px' }}>
                    {msg}
                  </span>
                )}
              </ErrorMessage>

              <Field name="password" type="password">
                {({ field, meta }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    inputProps={{ ...field }}
                    error={meta.touched && typeof meta.error !== 'undefined'}
                  />
                )}
              </Field>
              <ErrorMessage name="password">
                {(msg) => (
                  <span style={{ color: '#de1b1b', fontSize: '16px' }}>
                    {msg}
                  </span>
                )}
              </ErrorMessage>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Ingresar
              </Button>
              {authData?.status === 'error' && (
                <div
                  style={{
                    color: '#de1b1b',
                    fontSize: '16px',
                    marginBottom: '1rem',
                  }}
                >
                  Error, el usuario no se encuentra registrado
                </div>
              )}
              {authData?.status === 'fulfilled' && <div>Bienvenido</div>}
              <Grid container>
                <Grid item>
                  <Link component={RouterLink} to="/register">
                    {'No tiene una cuenta? Registrese'}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </div>
      </Container>
    </>
  )
}
