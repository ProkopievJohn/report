import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { createSelector, createStructuredSelector } from 'reselect'
import AppTitleBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'

import lightLogo from 'img/lightLogo.png'

import styles from './AppBar.scss'

class AppBar extends PureComponent {
  render() {
    const { push } = this.props
    return (
      <AppTitleBar position="static">
        <Toolbar>
          <ButtonBase onClick={() => push('/')}>
            <img width={50} height={50} src={lightLogo} />
            <Typography variant="h6" className={styles.title}>Report</Typography>
          </ButtonBase>
        </Toolbar>
      </AppTitleBar>
    )
  }
}
const user = createSelector(
  state => state.auth.user,
  user => user
)

const selector = createStructuredSelector({
  user
})

export default connect(selector, { push })(AppBar)
