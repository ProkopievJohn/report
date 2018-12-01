import React, { PureComponent, Fragment } from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import moment from 'moment'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import MoreIcon from '@material-ui/icons/MoreVert'

import StatusIcon from 'components/private/helpers/StatusIcon'

import { DATE_FORMAT } from 'appConstants'

import styles from './Projects.scss'

class Projects extends PureComponent {
  render() {
    const { projects, push } = this.props

    return (
      <Fragment>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell># Abilities</TableCell>
              <TableCell>Modified</TableCell>
              <TableCell>Status</TableCell>
              <TableCell numeric padding="none" className={styles.minCell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project, idx) => {
              const id = project.get('_id')
              const name = project.get('name')
              const description = project.get('description')
              const modified = project.get('modifiedAt')
              const status = project.get('status')
              const abilities = project.get('abilities')
              return (
                <Fragment key={idx}>
                  <TableRow hover onClick={() => push(`/projects/${id}`)} className={description ? styles.curserPointer : ''}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{abilities.length}</TableCell>
                    <TableCell>{moment(modified).format(DATE_FORMAT)}</TableCell>
                    <TableCell><StatusIcon status={status} /></TableCell>
                    <TableCell numeric padding="none"><MoreIcon /></TableCell>
                  </TableRow>
                </Fragment>
              )
            })}
          </TableBody>
        </Table>
      </Fragment>
    )
  }
}

const projects = createSelector(
  state => state.projects,
  projects => projects.get('data')
)

const selector = createStructuredSelector({
  projects
})

export default connect(selector, {
  // toggleEditModal: createAction(UI.MODAL.ABILITY.EDIT),
  // toggleRemoveModal: createAction(UI.MODAL.ABILITY.REMOVE)
  push
})(Projects)
