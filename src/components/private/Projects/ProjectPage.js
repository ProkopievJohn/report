import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Fab from '@material-ui/core/Fab'

import AddIcon from '@material-ui/icons/Add'

import { createAction } from 'utils/createAction'
import { UI } from 'appConstants'

import ProjectForm from './ProjectForm'
import AddUserActivityModal from 'components/private/Activities/AddUserActivityModal'

import styles from './Projects.scss'

class ProjectPage extends PureComponent {
  toggleAddUserModal = abilityId => {
    const { projectId, toggleAddUserActivityModal } = this.props
    if (abilityId && projectId) {
      toggleAddUserActivityModal({ abilityId, projectId })
    }
  }

  getUsersRows = ability => {
    const rows = []
    for (let i = 0; i < ability.quantity; i++) {
      rows.push(
        <TableRow key={i}>
          <TableCell padding="none" className={styles.minCell}>
            {null}
          </TableCell>
          <TableCell>-</TableCell>
          <TableCell>-</TableCell>
          <TableCell>-</TableCell>
        </TableRow>
      )
    }
    return rows
  }

  render() {
    const { project, projectAbilities } = this.props

    return (
      <Paper>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <ProjectForm
              disabled
              project={project}
              hideBtns
            />
          </div>
          <div className={styles.block}>
            {projectAbilities.map(ability => (
              <Paper key={ability.abilityId} className={styles.abilityPaperContainer}>
                <div className={styles.abilityPaperNameContainer}>
                  <div className={styles.abilityPaperName}>
                    {ability.name}
                  </div>
                  <div>some text</div>
                </div>
                <div className={styles.fabBtnContainer}>
                  <Fab size="small" color="secondary" onClick={() => this.toggleAddUserModal(ability.abilityId)}>
                    <AddIcon />
                  </Fab>
                </div>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Name</TableCell>
                      <TableCell>Test1</TableCell>
                      <TableCell>Test2</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.getUsersRows(ability)}
                  </TableBody>
                </Table>
              </Paper>
            )
            )}
          </div>
        </div>
        <AddUserActivityModal />
      </Paper>
    )
  }
}

const projectId = (state, props) => props.match.params.projectId

const project = createSelector(
  projectId,
  state => state.projects.get('data'),
  (projectId, projects) => projects.find(project => project.get('_id') === projectId)
)

const abilities = createSelector(
  state => state.abilities,
  abilities => abilities.get('data')
)

const projectAbilities = createSelector(
  project,
  abilities,
  (project, abilities) => {
    if (!project || !abilities.size) {
      return []
    }
    return project.get('abilities').map(pa => ({
      ...pa,
      name: abilities.find(a => a.get('_id') === pa.abilityId).get('name')
    }))
  }
)

const selector = createStructuredSelector({
  projectId,
  project,
  projectAbilities
})

export default connect(selector, {
  toggleAddUserActivityModal: createAction(UI.MODAL.ACTIVITY.USER.ADD)
})(ProjectPage)
