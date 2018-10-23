import React, { PureComponent } from 'react'
import { reduxForm, Field } from 'redux-form'
import Button from '@material-ui/core/Button'
import isEmail from 'validator/lib/isEmail'
import CustomTextField from '../lib/CustomTextField'

import './LoginForm.scss'

class LoginForm extends PureComponent {
  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      invalid,
      error
    } = this.props

    return (
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
          <div className="login-form-field">
            <Field
              component={CustomTextField}
              fullWidth
              name="email"
              type="email"
              label="Email"
              error={!!error}
              errorText={error}
              required
            />
          </div>
          <div className="login-form-field">
            <Field
              component={CustomTextField}
              fullWidth
              error={!!error}
              name="password"
              type="password"
              label="Password"
              required
            />
          </div>
          <div className="login-form-btn">
            <Button disabled={invalid || pristine || submitting} color="primary" type="submit">Login</Button>
          </div>
        </form>
      </div>
    )
  }
}

const validate = (values, props) => {
  const errors = {}
  const { email, password } = values
  if (!email) {
    errors.email = 'Required'
  }
  if (email && !isEmail(email)) {
    errors.email = 'Please provide a valid email'
  }
  if (!password) {
    errors.password = 'Required'
  }
  return errors
}

const handleSubmitForm = (data, dispatch, props) => {
  const { onLogin } = props
  onLogin(data)
}

export default reduxForm({
  form: 'LoginForm',
  validate,
  onSubmit: handleSubmitForm
})(LoginForm)
