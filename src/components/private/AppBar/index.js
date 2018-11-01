import React, { PureComponent } from 'react'
import AppTitleBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'

import lightLogo from 'img/lightLogo.png'

import styles from './AppBar.scss'

class AppBar extends PureComponent {
  render() {
    return (
      <AppTitleBar position="static">
        <Toolbar>
          <ButtonBase>
            <img width={50} height={50} src={lightLogo} />
            <Typography variant="h6" className={styles.title}>Report</Typography>
          </ButtonBase>
        </Toolbar>
      </AppTitleBar>
    )
  }
}

export default AppBar
