import React, { PureComponent, Fragment } from 'react'
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
import ArrowExpandIcon from 'components/private/helpers/ArrowExpandIcon'

import { DATE_FORMAT } from 'appConstants'

import styles from './Projects.scss'

class Projects extends PureComponent {
  state = {
    expanded: {}
  }

  toggleExpand = id => this.setState({
    expanded: {
      ...this.state.expanded,
      [id]: !this.state.expanded[id]
    }
  })

  render() {
    const { projects } = this.props
    const { expanded } = this.state

    return (
      <Fragment>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="none" className={styles.minCell} />
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
                  <TableRow hover onClick={() => description && this.toggleExpand(id)} className={description ? styles.curserPointer : ''}>
                    <TableCell padding="none" className={`${styles.minCell} ${expanded[id] ? styles.borderNone : ''}`} >
                      {description && <ArrowExpandIcon expanded={expanded[id]} />}
                    </TableCell>
                    <TableCell className={expanded[id] ? styles.borderNone : ''}>{name}</TableCell>
                    <TableCell className={expanded[id] ? styles.borderNone : ''}>{abilities.length}</TableCell>
                    <TableCell className={expanded[id] ? styles.borderNone : ''}>{moment(modified).format(DATE_FORMAT)}</TableCell>
                    <TableCell className={expanded[id] ? styles.borderNone : ''}><StatusIcon status={status} /></TableCell>
                    <TableCell numeric padding="none" className={`${styles.minCell} ${expanded[id] ? styles.borderNone : ''}`} >
                      <MoreIcon />
                    </TableCell>
                  </TableRow>
                  {expanded[id] && <TableRow>
                    <TableCell padding="none" className={styles.minCell} />
                    <TableCell colSpan={5}>{description}</TableCell>
                  </TableRow>}
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
})(Projects)
