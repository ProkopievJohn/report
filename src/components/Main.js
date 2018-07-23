import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import { Route, Switch } from 'react-router-dom'
// import Login from './public/Login'
// import Register from './public/Register'
// import Dashboard from './secure/dashboard'

class Main extends PureComponent {
  render() {
    const { isAuthenticated } = this.props
    if (isAuthenticated) {
      return (
        <div className="main">
          {/* <AppBar /> */}
          <Switch>
            <Route component={() => null} />
          </Switch>
        </div>
      )
    }

    return (
      <div>
        <Switch>
          <Route path="/register" component={() => null} />
          <Route component={() => null} />
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

export default connect(selector)(Main)
