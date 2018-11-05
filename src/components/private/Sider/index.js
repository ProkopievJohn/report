import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import Paper from '@material-ui/core/Paper'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

import AddProjectModal from 'components/private/Projects/AddProjectModal'
import { createAction } from 'utils/createAction'
import { UI } from 'appConstants'

import styles from './Sider.scss'

class Sider extends PureComponent {
  handleListItemClick = path => {
    const { location, push } = this.props
    location.pathname !== path && push(path)
  }

  render() {
    const { match, toggleAddProject } = this.props

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
              <IconButton
                onClick={toggleAddProject}
                aria-label="Add Project"
                classes={{ root: match.params.path === 'projects' ? styles.active : '' }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </ListItemSecondaryAction>
          </MenuItem>
        </MenuList>

        <AddProjectModal />
      </Paper>
    )
  }
}

export default connect(null, {
  push,
  toggleAddProject: createAction(UI.MODAL.PROJECT.ADD)
})(Sider)
