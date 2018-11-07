import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import { Switch, Route, withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import AppBar from './AppBar'
import TempBlock from './TempBlock'
import Sider from './Sider'
import Abilities from './Abilities'

class Private extends PureComponent {
  render() {
    const { isAuthenticated } = this.props
    if (!isAuthenticated) {
      return null
    }

    return (
      <div className="main">
        <AppBar />
        <TempBlock />
        <Grid container spacing={24} className="main-content">
          <Grid item xs={3}>
            <Switch>
              <Route path="/:path?" component={Sider} />
            </Switch>
          </Grid>
          <Grid item xs={9}>
            <Paper>
              <Switch>
                <Route exact path="/" component={() => 'dashboard'} />
                <Route path="/projects" component={() => 'projects'} />
                <Route path="/abilities" component={Abilities} />
              </Switch>
            </Paper>
          </Grid>
        </Grid>
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

export default withRouter(connect(selector)(Private))
