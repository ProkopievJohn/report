import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'
import { createAction } from '../../utils/createAction'
import { AUTH } from '../../constants'

import './index.scss'
import './Login.scss'
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

export class Register extends PureComponent {
  render() {
    const { handleSubmit, pristine, submitting } = this.props
    return (
      <div className="wrapper">
        <div className="header">
          <div className="container">
            <img src={logo} alt="logo" /> Report
          </div>
        </div>
        <div className="login">
          <Paper zDepth={3} className="form">
            <form onSubmit={handleSubmit}>
              <div className="title">Login</div>
              <div className="content">
                <Field name="email" type="text" component={renderTextField} label="Email" className="field" />
                <Field name="password" type="password" component={renderTextField} label="Password" className="field" />
              </div>
              <div className="actions">
                <RaisedButton
                  className="bt-login"
                  disabled={pristine || submitting}
                  primary
                  label="Login"
                  type="submit"
                  />
              </div>
              <div className="href-reset">
                <Link to="/">Login</Link>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    )
  }
}

const handleSubmitForm = (data, dispatch, props) => {
  // const { login } = props
}

const RegisterForm = reduxForm({
  form: 'RegisterForm',
  onSubmit: handleSubmitForm
})(Register)

export default connect(
  state => ({
    state
  }),
  {
    login: createAction(AUTH)
  }
)(RegisterForm)
