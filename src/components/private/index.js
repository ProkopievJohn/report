import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import { Route, Switch } from 'react-router-dom'

import AppBar from './AppBar'

class Private extends PureComponent {
  render() {
    const { isAuthenticated } = this.props
    if (!isAuthenticated) {
      return null
    }

    return (
      <div className="main">
        <AppBar />
        <Switch>
          <Route component={() => <div>test</div>} />
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

export default connect(selector)(Private)
