import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import { Switch, Route, withRouter } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

class Public extends PureComponent {
  render() {
    const { isAuthenticated } = this.props
    if (isAuthenticated) {
      return null
    }

    return (
      <div className="main">
        <Switch>
          <Route path="/register" component={Register} />
          <Route component={Login} />
        </Switch>
      </div>
    )
  }
}

const isAuthenticated = createSelector(
  state => state.auth.token,
  token => !!token
)

const selector = createStructuredSelector({
  isAuthenticated
})

export default withRouter(connect(selector)(Public))
