import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { push } from 'react-router-redux'

import './index.scss'
import logo from '../../img/report.png'
import { createAction } from '../../utils/createAction'
import { AUTH } from '../../constants'

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const validate = values => {
  const errors = {}
  const requiredFields = ['email', 'password']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = `${field} is required.`
    }
  })
  if (values.email && !/^[\w0-9._%+-]+@[\w0-9.-]+\.[\w]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address.'
  }
  return errors
}

export class Login extends PureComponent {
  handleRegister = () => {
    const { push } = this.props
    push('/register')
  }

  render() {
    const { handleSubmit, pristine, submitting, error } = this.props
    return (
      <div className="wrapper">
        <div className="header">
          <div className="container">
            <img src={logo} alt="logo" /> Report
          </div>
        </div>
        <div className="public-container">
          <Paper zDepth={3} className="public-form">
            <form onSubmit={handleSubmit}>
              <div className="public-form-title">Login</div>
              <div className="public-form-content">
                <Field name="email" type="text" component={renderTextField} label="Email" className="field" />
                <Field name="password" type="password" component={renderTextField} label="Password" className="field" />
                <div className="public-error">{error}</div>
              </div>
              <div className="public-form-actions">
                <RaisedButton
                  className="public-btn"
                  disabled={pristine || submitting}
                  primary
                  label="Login"
                  type="submit"
                  />
                <FlatButton
                  className="public-btn"
                  label="Register"
                  secondary
                  onClick={this.handleRegister}
                />
              </div>
            </form>
          </Paper>
        </div>
      </div>
    )
  }
}

const handleSubmitForm = (data, dispatch, props) => {
  const { login } = props
  login(data)
}

const LoginForm = reduxForm({
  form: 'LoginForm',
  validate,
  onSubmit: handleSubmitForm
})(Login)

export default connect(
  state => ({
    state
  }),
  {
    login: createAction(AUTH),
    push
  }
)(LoginForm)
