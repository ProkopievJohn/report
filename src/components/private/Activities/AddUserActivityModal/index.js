import React from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import { Map } from 'immutable'
import moment from 'moment'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

import { createAction } from 'utils/createAction'
import { UI, ACTIVITY, DATE_FORMAT } from 'appConstants'
import ModalExtends from 'components/lib/ModalExtends'
import UserActivityForm from '../UserActivityForm'

class AddUserActivityModal extends ModalExtends {
  handleSubmit = data => {
    const { addUserActivity, projectId, abilityId } = this.props
    if (projectId && abilityId) {
      addUserActivity({ ...data, projectId, abilityId })
    }
  }

  render() {
    const {
      open,
      project,
      abilityId,
      ability
    } = this.props
    const projectName = project.get('name')
    const abilityName = ability.get('name')
    const since = moment(project.get('since')).format(DATE_FORMAT)
    const to = moment(project.get('to')).format(DATE_FORMAT)

    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
      >
        <DialogTitle>Add User as {abilityName} to {projectName}</DialogTitle>
        <DialogContent>
          Project from {since} to {to}
          <UserActivityForm onClose={this.handleClose} submitActivity={this.handleSubmit} project={project} abilityId={abilityId} />
        </DialogContent>
      </Dialog>
    )
  }
}

const open = createSelector(
  state => state.ui.activity.add,
  open => open
)

const projectId = state => state.ui.activity.projectId
const abilityId = state => state.ui.activity.abilityId

const project = createSelector(
  projectId,
  state => state.projects.get('data'),
  (projectId, projects) => projects.find(u => u.get('_id') === projectId) || new Map()
)

const ability = createSelector(
  abilityId,
  state => state.abilities.get('data'),
  (abilityId, abilities) => abilities.find(u => u.get('_id') === abilityId) || new Map()
)

const selector = createStructuredSelector({
  open,
  projectId,
  project,
  abilityId,
  ability
})

export default connect(selector, {
  toggle: createAction(UI.MODAL.ACTIVITY.USER.ADD),
  addUserActivity: createAction(ACTIVITY.USER.ADD)
})(AddUserActivityModal)
