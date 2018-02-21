import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { push } from 'react-router-redux'
import FlatButton from 'material-ui/FlatButton'
import { createAction } from '../../utils/createAction'
import { REGISTER } from '../../constants'
import './index.scss'
import logo from '../../img/report.png'

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
  const requiredFields = ['email', 'password', 'confirmPassword']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = `${field} is required.`
    }
  })
  if (values.email && !/^[\w0-9._%+-]+@[\w0-9.-]+\.[\w]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address.'
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }
  return errors
}

export class Register extends PureComponent {
  handleLogin = () => {
    const { push } = this.props
    push('/')
  }

  render() {
    const { handleSubmit, pristine, invalid, submitting, error } = this.props
    console.log('this.props: ', this.props)
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
              <div className="public-form-title">Register</div>
              <div className="public-form-content">
                <Field name="email" type="text" component={renderTextField} label="Email" className="field" />
                <Field name="password" type="password" component={renderTextField} label="Password" className="field" />
                <Field name="confirmPassword" type="password" component={renderTextField} label="Confirm Password" className="field" />
                <div className="public-error">{error}</div>
              </div>
              <div className="public-form-actions">
                <RaisedButton
                  className="bt-login"
                  disabled={pristine || submitting || invalid}
                  primary
                  label="Register"
                  type="submit"
                  />
                <FlatButton
                  className="public-btn"
                  label="Login"
                  secondary
                  onClick={this.handleLogin}
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
  const { register } = props
  register(data)
}

const RegisterForm = reduxForm({
  form: 'RegisterForm',
  validate,
  onSubmit: handleSubmitForm
})(Register)

export default connect(
  state => ({
    state
  }),
  {
    register: createAction(REGISTER),
    push
  }
)(RegisterForm)
