import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import moment from 'moment'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'

import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreIcon from '@material-ui/icons/MoreVert'

import { DATE_FORMAT, UI } from 'appConstants'
import { createAction } from 'utils/createAction'

import StatusIcon from 'components/private/helpers/StatusIcon'
import ArrowExpandIcon from 'components/private/helpers/ArrowExpandIcon'
import EditAbilityModal from './EditAbilityModal'
import RemoveAbilityModal from './RemoveAbilityModal'

import styles from './Abilities.scss'

class Abilities extends PureComponent {
  state = {
    expanded: {},
    menu: {
      anchorEl: null,
      id: null
    }
  }

  toggleExpand = id => this.setState({
    expanded: {
      ...this.state.expanded,
      [id]: !this.state.expanded[id]
    }
  })

  toggleMenu = (e, id) => this.setState({
    menu: {
      id: id && this.state.menu.id !== id ? id : null,
      anchorEl: id && this.state.menu.id !== id ? e.currentTarget : null
    }
  })

  renderMenu = id => {
    if (!id) {
      return null
    }
    const { toggleEditModal, toggleRemoveModal } = this.props
    const { menu: { anchorEl, id: menuId } } = this.state
    return (
      <Fragment>
        <IconButton
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            this.toggleMenu(e, id)
          }}
          aria-label="More"
          aria-owns={!anchorEl ? undefined : id}
          aria-haspopup="true"
        >
          <MoreIcon />
        </IconButton>
        <Menu
          id={id}
          anchorEl={anchorEl}
          open={menuId === id}
          onClose={e => {
            e.preventDefault()
            e.stopPropagation()
            this.toggleMenu()
          }}
        >
          <MenuItem onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            toggleEditModal(id)
            this.toggleMenu()
          }}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <Typography variant="inherit">Edit Ability</Typography>
          </MenuItem>
          <MenuItem onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            toggleRemoveModal(id)
            this.toggleMenu()
          }}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <Typography variant="inherit">Delete Ability</Typography>
          </MenuItem>
        </Menu>
      </Fragment>
    )
  }

  render() {
    const { abilities } = this.props
    const { expanded } = this.state

    return (
      <Fragment>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="none" className={styles.minCell} />
              <TableCell>Name</TableCell>
              <TableCell numeric>Modified</TableCell>
              <TableCell numeric>Status</TableCell>
              <TableCell padding="none" className={styles.minCell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {abilities.map((ability, idx) => {
              const id = ability.get('_id')
              const name = ability.get('name')
              const description = ability.get('description')
              const modified = ability.get('modifiedAt')
              const status = ability.get('status')
              return (
                <Fragment key={idx}>
                  <TableRow hover onClick={() => description && this.toggleExpand(id)} className={description ? styles.curserPointer : ''}>
                    <TableCell padding="none" className={`${styles.minCell} ${expanded[id] ? styles.borderNone : ''}`} >
                      {description && <ArrowExpandIcon expanded={expanded[id]} />}
                    </TableCell>
                    <TableCell className={expanded[id] ? styles.borderNone : ''}>{name}</TableCell>
                    <TableCell numeric className={expanded[id] ? styles.borderNone : ''}>{moment(modified).format(DATE_FORMAT)}</TableCell>
                    <TableCell numeric className={expanded[id] ? styles.borderNone : ''}><StatusIcon status={status} /></TableCell>
                    <TableCell padding="none" className={`${styles.minCell} ${expanded[id] ? styles.borderNone : ''}`} >
                      {this.renderMenu(id)}
                    </TableCell>
                  </TableRow>
                  {expanded[id] && <TableRow>
                    <TableCell padding="none" className={styles.minCell} />
                    <TableCell colSpan={3}>{description}</TableCell>
                  </TableRow>}
                </Fragment>
              )
            })}
          </TableBody>
        </Table>
        <EditAbilityModal />
        <RemoveAbilityModal />
      </Fragment>
    )
  }
}

const abilities = createSelector(
  state => state.abilities,
  abilities => abilities.get('data')
)

const abilitiesLoading = createSelector(
  state => state.abilities,
  abilities => abilities.get('loading')
)

const abilitiesError = createSelector(
  state => state.abilities,
  abilities => abilities.get('error')
)

const selector = createStructuredSelector({
  abilities,
  abilitiesLoading,
  abilitiesError
})

export default connect(selector, {
  toggleEditModal: createAction(UI.MODAL.ABILITY.EDIT),
  toggleRemoveModal: createAction(UI.MODAL.ABILITY.REMOVE)
})(Abilities)
