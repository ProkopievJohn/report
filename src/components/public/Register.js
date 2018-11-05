import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'

import { AUTH } from 'appConstants'
import { createAction } from 'utils/createAction'
import RegisterForm from './RegisterForm'

import styles from './Public.scss'

class Register extends PureComponent {
  render() {
    const { register } = this.props
    return (
      <div className={styles.page}>
        <Card className={styles.card}>
          <CardHeader title="Register" />
          <CardContent>
            <RegisterForm onRegister={register} />
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default connect(null, {
  register: createAction(AUTH.REGISTER)
})(Register)
