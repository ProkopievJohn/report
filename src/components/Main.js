import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import { Route, Switch, withRouter } from 'react-router-dom'
import Login from './public/Login'
import Private from './private'

import './Main.css'

class Main extends Component {
  render() {
    const { isAuthenticated } = this.props
    if (isAuthenticated) {
      return (
        <Private />
      )
    }

    return (
      <div className="bg">
        <Switch>
          <Route path="/register" component={() => null} />
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

export default withRouter(connect(selector)(Main))
