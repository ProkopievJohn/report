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

class EditAbilityModal extends ModalExtends {
  handleEditAbility = ability => {
    const { editAbility, _id } = this.props
    editAbility({ ...ability, _id })
  }
  render() {
    const { open, ability } = this.props

    if (!ability) {
      return null
    }
    return (
      <Dialog open={open} onClose={this.handleClose} >
        <DialogTitle>Edit Ability</DialogTitle>
        <DialogContent>
          <AbilityForm
            onClose={this.handleClose}
            submitAbility={this.handleEditAbility}
            ability={ability}
          />
        </DialogContent>
      </Dialog>
    )
  }
}

const open = createSelector(
  state => state.ui.ability.edit,
  open => open
)

const _id = createSelector(
  state => state.ui.ability.id,
  id => id
)

const ability = createSelector(
  state => state.abilities.get('data'),
  _id,
  (abilities, id) => abilities.find(a => a.get('_id') === id)
)

const selector = createStructuredSelector({
  open,
  _id,
  ability
})

export default connect(selector, {
  toggle: createAction(UI.MODAL.ABILITY.EDIT),
  editAbility: createAction(ABILITY.EDIT)
})(EditAbilityModal)
