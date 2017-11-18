import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Login from './public/Login'

class Main extends PureComponent {
  render() {
    return (
      <div>
        <Switch>
          <Route component={Login} />
        </Switch>
      </div>
    )
  }
}

export default connect(
  state => ({
    state
  })
)(Main)
