import React from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

import { createAction } from 'utils/createAction'
import { UI, PROJECT } from 'appConstants'
import ModalExtends from 'components/lib/ModalExtends'
import AddProjectForm from '../AddProjectForm'

class AddProjectModal extends ModalExtends {
  render() {
    const { open, addProject } = this.props
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Create Project</DialogTitle>
        <DialogContent>
          <AddProjectForm onClose={this.handleClose} addProject={addProject} />
        </DialogContent>
      </Dialog>
    )
  }
}

const open = createSelector(
  state => state.ui.project.add,
  open => open
)

const selector = createStructuredSelector({
  open
})

export default connect(selector, {
  toggle: createAction(UI.MODAL.PROJECT.ADD),
  addProject: createAction(PROJECT.ADD)
})(AddProjectModal)
