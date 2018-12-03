import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import moment from 'moment'
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
      const user = ability.users.get(i)
      const userName = user ? user.get('name') : '-'
      const userRate = user && user.get('rate')
      const rate = userRate ? `${userRate} $/h` : '-'
      const activity = ability.activities.get(i)
      const activityHours = activity && activity.get('hours')
      const hours = activityHours ? `${activityHours} h` : '-'
      const totalByDay = userRate && activityHours ? `${userRate * activityHours} $/day` : '-'
      rows.push(
        <TableRow key={i}>
          <TableCell padding="none" className={styles.minCell}>
            {null}
          </TableCell>
          <TableCell>{userName}</TableCell>
          <TableCell>{rate}</TableCell>
          <TableCell>{hours}</TableCell>
          <TableCell>{totalByDay}</TableCell>
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
                  <div>Total {ability.total} $</div>
                </div>
                {ability.quantity !== ability.users.size && <div className={styles.fabBtnContainer}>
                  <Fab size="small" color="secondary" onClick={() => this.toggleAddUserModal(ability.abilityId)}>
                    <AddIcon />
                  </Fab>
                </div>}
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Name</TableCell>
                      <TableCell>Rate</TableCell>
                      <TableCell>Hours / Day</TableCell>
                      <TableCell>$ / Day</TableCell>
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

const projectActivities = createSelector(
  projectId,
  state => state.activities.get('data'),
  (projectId, activities) => activities.filter(activity => activity.get('projectId') === projectId)
)

const users = createSelector(
  state => state.users,
  users => users.get('data')
)

const projectAbilities = createSelector(
  project,
  abilities,
  projectActivities,
  users,
  (project, abilities, projectActivities, allUsers) => {
    if (!project || !abilities.size) {
      return []
    }
    return project.get('abilities').map(pa => {
      const tempActivityes = {}
      let total = 0
      const name = abilities.find(a => a.get('_id') === pa.abilityId).get('name')
      const activities = projectActivities.filter(act => act.get('abilityId') === pa.abilityId).map(activity => {
        const days = moment(activity.get('to')).diff(moment(activity.get('since')), 'days') + 1
        const hours = activity.get('hours')
        tempActivityes[activity.get('_id')] = {
          [activity.get('userId')]: days * hours
        }
        return activity
      })
      const users = allUsers.filter(user => activities.map(activity => activity.get('userId')).includes(user.get('_id'))).map(user => {
        const userId = user.get('_id')
        const rate = user.get('rate')
        for (const activityId in tempActivityes) {
          if (tempActivityes[activityId][userId]) {
            total += tempActivityes[activityId][userId] * rate
          }
        }
        return user
      })
      return {
        ...pa,
        name,
        activities,
        users,
        total
      }
    })
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
