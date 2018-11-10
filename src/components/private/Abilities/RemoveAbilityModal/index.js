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

class RemoveAbilityModal extends ModalExtends {
  handleRemoveAbility = ability => {
    const { removeAbility, _id } = this.props
    removeAbility({ _id })
  }
  render() {
    const { open, ability } = this.props

    if (!ability) {
      return null
    }
    return (
      <Dialog open={open} onClose={this.handleClose} >
        <DialogTitle>Remove Ability</DialogTitle>
        <DialogContent>
          <AbilityForm
            disabled
            onClose={this.handleClose}
            submitAbility={this.handleRemoveAbility}
            ability={ability}
            submitText="Remove"
          />
        </DialogContent>
      </Dialog>
    )
  }
}

const open = createSelector(
  state => state.ui.ability.remove,
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
  toggle: createAction(UI.MODAL.ABILITY.REMOVE),
  removeAbility: createAction(ABILITY.REMOVE)
})(RemoveAbilityModal)
