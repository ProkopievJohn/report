import React from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

import { createAction } from 'utils/createAction'
import { UI, ABILITY } from 'appConstants'
import ModalExtends from 'components/lib/ModalExtends'
import AbilityForm from '../AbilityForm'

class AddAbilityModal extends ModalExtends {
  render() {
    const { open, addAbility } = this.props
    return (
      <Dialog open={open} onClose={this.handleClose} >
        <DialogTitle>Create Ability</DialogTitle>
        <DialogContent>
          <AbilityForm onClose={this.handleClose} submitAbility={addAbility} />
        </DialogContent>
      </Dialog>
    )
  }
}

const open = createSelector(
  state => state.ui.ability.add,
  open => open
)

const selector = createStructuredSelector({
  open
})

export default connect(selector, {
  toggle: createAction(UI.MODAL.ABILITY.ADD),
  addAbility: createAction(ABILITY.ADD)
})(AddAbilityModal)
