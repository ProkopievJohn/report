import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import { Switch, Route, withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import AppBar from './AppBar'
import Sider from './Sider'
import Abilities from './Abilities'
import Users from './Users'
import Projects from './Projects'
import ProjectPage from './Projects/ProjectPage'

class SiderRouters extends PureComponent {
  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={3}>
          <Switch>
            <Route path="/:path?" component={Sider} />
          </Switch>
        </Grid>
        <Grid item xs={9}>
          <Paper>
            <Switch>
              <Route exact path="/" component={() => 'dashboard'} />
              <Route path="/users" component={Users} />
              <Route path="/projects" component={Projects} />
              <Route path="/abilities" component={Abilities} />
            </Switch>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

class Private extends PureComponent {
  render() {
    const { isAuthenticated } = this.props
    if (!isAuthenticated) {
      return null
    }

    return (
      <div className="main">
        <AppBar />
        <div className="main-content">
          <Switch>
            <Route path="/projects/:projectId" component={ProjectPage} />
            <Route component={SiderRouters} />
          </Switch>
        </div>
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
