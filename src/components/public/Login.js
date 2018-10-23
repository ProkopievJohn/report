import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { AUTH } from '../../constants'
// import { connect } from 'react-redux'
// import { createSelector, createStructuredSelector } from 'reselect'
// import { destroy } from 'redux-form'
import { createAction } from '../../utils/createAction'
import LoginForm from './LoginForm'
import './Login.scss'

class Login extends PureComponent {
  render() {
    const { login } = this.props
    return (
      <div className="login-page">
        <Card className="login-card">
          <CardHeader title="Login" />
          <CardContent>
            <LoginForm onLogin={login} />
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default connect(null, {
  login: createAction(AUTH)
})(Login)
