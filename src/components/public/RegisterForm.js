import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import Button from '@material-ui/core/Button'
import isEmail from 'validator/lib/isEmail'
import CustomTextField from '../lib/CustomTextField'

import styles from './Public.scss'

class RegisterForm extends PureComponent {
  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      invalid,
      error
    } = this.props

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <Field
              component={CustomTextField}
              fullWidth
              name="name"
              type="text"
              label="Company Name"
              error={!!error}
              errorText={error}
              required
            />
          </div>
          <div className={styles.field}>
            <Field
              component={CustomTextField}
              fullWidth
              name="email"
              type="email"
              label="Email"
              error={!!error}
              required
            />
          </div>
          <div className={styles.field}>
            <Field
              component={CustomTextField}
              fullWidth
              name="confirmEmail"
              type="email"
              label="Confirm Email"
              error={!!error}
              required
            />
          </div>
          <div className={styles.field}>
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
          <div className={styles.field}>
            <Field
              component={CustomTextField}
              fullWidth
              error={!!error}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              required
            />
          </div>
          <div className={styles.btns}>
            <Link to="/" className={styles.link}>Go to Login</Link>
            <Button disabled={invalid || pristine || submitting} color="primary" type="submit">Register</Button>
          </div>
        </form>
      </div>
    )
  }
}

const validate = (values, props) => {
  const errors = {}
  const { name, email, confirmEmail, password, confirmPassword } = values
  if (!name) {
    errors.name = 'Required'
  }
  if (!email) {
    errors.email = 'Required'
  }
  if (!confirmEmail) {
    errors.confirmEmail = 'Required'
  }
  if (email && !isEmail(email)) {
    errors.email = 'Please provide a valid email'
  }
  if (email && confirmEmail && email !== confirmEmail) {
    errors.confirmEmail = 'Email does not match'
  }
  if (!password) {
    errors.password = 'Required'
  }
  if (!confirmPassword) {
    errors.confirmPassword = 'Required'
  }
  if (password && confirmPassword && password !== confirmPassword) {
    errors.confirmPassword = 'Password does not match'
  }
  return errors
}

const handleSubmitForm = (data, dispatch, props) => {
  const { onRegister } = props
  onRegister(data)
}

export default reduxForm({
  form: 'RegisterForm',
  validate,
  onSubmit: handleSubmitForm
})(RegisterForm)
