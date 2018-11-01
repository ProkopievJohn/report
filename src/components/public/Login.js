import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { AUTH } from '../../constants'
import { createAction } from '../../utils/createAction'
import LoginForm from './LoginForm'

import styles from './Login.scss'

class Login extends PureComponent {
  render() {
    const { login } = this.props
    return (
      <div className={styles.loginPage}>
        <Card className={styles.loginCard}>
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
