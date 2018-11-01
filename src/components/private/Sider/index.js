import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import Paper from '@material-ui/core/Paper'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

import styles from './Sider.scss'

class Sider extends Component {
  handleListItemClick = path => {
    const { location, push } = this.props
    location.pathname !== path && push(path)
  }

  render() {
    const { match } = this.props

    return (
      <Paper className={styles.container}>
        <MenuList>
          <MenuItem
            button
            selected={match.params.path === undefined}
            classes={{ selected: styles.selected }}
            onClick={() => this.handleListItemClick('/')}
          >
            <ListItemText primary="Dashboard" />
          </MenuItem>
          <MenuItem
            button
            selected={match.params.path === 'projects'}
            classes={{ selected: styles.selected }}
            onClick={() => this.handleListItemClick('/projects')}
          >
            <ListItemText primary="Projects" />
            <ListItemSecondaryAction>
              <IconButton aria-label="Add Project">
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </MenuItem>
        </MenuList>
      </Paper>
    )
  }
}

export default connect(null, { push })(Sider)
