import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { FormLogic } from '../LoginForm'

//Testing Login-Form component

const authDataError = {
  status: 'error',
}

const authDataSuccess = {
  status: 'fullfilled',
}

const setupRender = (authData) => {
  const initialState = {
    status: '',
    token: false,
    isAuthenticated: false,
    user: {},
    role: undefined,
  }
  const mockStore = configureStore()

  const store = mockStore(initialState)

  render(
    <Provider store={store}>
      <BrowserRouter>
        <FormLogic classes={{}} authData={authData} />
      </BrowserRouter>
    </Provider>,
  )
}

const typeIntoForm = ({ email, password }) => {
  const emailInputElement = screen.getByRole('textbox', {
    name: 'Correo electrónico',
  })
  const passwordInputElement = screen.getByLabelText('Contraseña')

  if (email) {
    userEvent.type(emailInputElement, email)
  }
  if (password) {
    userEvent.type(passwordInputElement, password)
  }

  return {
    emailInputElement,
    passwordInputElement,
  }
}

const clickOnSubmitButton = () => {
  const submitBtnElement = screen.getByRole('button', {
    name: 'Ingresar',
  })

  userEvent.click(submitBtnElement)
}

describe('Form tests', () => {
  test('Should be able to type in email field', () => {
    setupRender()

    const emailInputElement = screen.getByRole('textbox', {
      name: 'Correo electrónico',
    })

    userEvent.type(emailInputElement, 'testing')

    expect(emailInputElement.value).toBe('testing')
  })

  test('Should be able to type in password field', () => {
    setupRender()

    const passwordInputElement = screen.getByLabelText('Contraseña')

    userEvent.type(passwordInputElement, 'testing')

    expect(passwordInputElement.value).toBe('testing')
  })

  describe('Error handling', () => {
    test('Should be an error message on invalid or null email and initialy not error message', async () => {
      setupRender()

      const emailErrorElement = screen.queryByText('Ingrese un email correcto')
      expect(emailErrorElement).not.toBeInTheDocument()

      typeIntoForm({
        email: 'error.com',
      })
      clickOnSubmitButton()

      const emailErrorElementAgain = await screen.findByText(
        'Ingrese un email correcto',
      )

      expect(emailErrorElementAgain).toBeInTheDocument()
    })

    test('Should be an error message on null password and initialy not error message', async () => {
      setupRender()

      const passwordErrorElement = screen.queryByText(
        'Ingrese una contraseña correcta',
      )
      expect(passwordErrorElement).not.toBeInTheDocument()

      typeIntoForm({
        email: 'test@test.com',
      })
      clickOnSubmitButton()

      const passwordErrorElementAgain = await screen.findByText(
        'Ingrese una contraseña correcta',
      )

      expect(passwordErrorElementAgain).toBeInTheDocument()
    })

    test('Should be an error message on not registered user', async () => {
      setupRender(authDataError)

      typeIntoForm({
        email: 'error@errorerror.error',
        password: 'Errorerror.',
      })
      clickOnSubmitButton()

      const notRegisterError = await screen.findByText(
        'Error, el usuario no se encuentra registrado',
      )

      expect(notRegisterError).toBeInTheDocument()
    })
  })

  test('Correct login request', async () => {
    setupRender(authDataSuccess)

    typeIntoForm({
      email: 'testing@testing.testing',
      password: 'T.123456',
    })

    clickOnSubmitButton()

    const welcomeText = await screen.findByText('Bienvenido')

    expect(welcomeText).toBeInTheDocument()
  })
})
