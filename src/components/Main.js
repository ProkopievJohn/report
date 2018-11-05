import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom'
import Private from './private'
import Public from './public'

import './Main.css'

class Main extends PureComponent {
  render() {
    const { isAuthenticated } = this.props
    if (isAuthenticated) {
      return (
        <div className="bg">
          <Private />
        </div>
      )
    }

    return (
      <div className="bg">
        <Public />
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
