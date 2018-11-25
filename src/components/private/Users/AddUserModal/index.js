import React from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

import { createAction } from 'utils/createAction'
import { UI, USER } from 'appConstants'
import ModalExtends from 'components/lib/ModalExtends'
import UserForm from '../UserForm'

class AddUserModal extends ModalExtends {
  render() {
    const { open, addUser } = this.props
    return (
      <Dialog open={open} onClose={this.handleClose} >
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <UserForm onClose={this.handleClose} submitUser={addUser} />
        </DialogContent>
      </Dialog>
    )
  }
}

const open = createSelector(
  state => state.ui.user.add,
  open => open
)

const selector = createStructuredSelector({
  open
})

export default connect(selector, {
  toggle: createAction(UI.MODAL.USER.ADD),
  addUser: createAction(USER.ADD)
})(AddUserModal)
