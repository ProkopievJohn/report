import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import { reduxForm, Field } from 'redux-form'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'

import AddIcon from '@material-ui/icons/Add'

import CustomSelectField from 'components/lib/CustomSelectField'
import CustomTextField from 'components/lib/CustomTextField'

import styles from './AbilitiesInputWithQuantity.scss'

class Form extends PureComponent {
  render() {
    const {
      handleSubmit,
      error,
      onClose,
      invalid,
      pristine,
      submitting,
      abilities
    } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.field}>
          <Field
            component={CustomSelectField}
            values={abilities.map(ability => ({ id: ability.get('_id'), name: ability.get('name') }))}
            fullWidth
            name="abilityId"
            label="Ability"
            error={!!error}
            errorText={error}
            required
          />
        </div>
        <div className={styles.field}>
          <Field
            component={CustomTextField}
            fullWidth
            type="number"
            name="quantity"
            label="Quantity"
            error={!!error}
            required
          />
        </div>
        <div className={styles.btn}>
          <Button color="secondary" onClick={onClose}>Cancel</Button>
          <Button disabled={invalid || pristine || submitting} color="primary" onClick={handleSubmit}>Add</Button>
        </div>
      </div>
    )
  }
}

const validate = (values, props) => {
  const errors = {}
  const { abilityId, quantity } = values
  if (!abilityId) {
    errors.abilityId = 'Required'
  }
  if (!quantity) {
    errors.quantity = 'Required'
  }
  return errors
}

const handleSubmitForm = (data, dispatch, props) => {
  const { submitAbility } = props
  submitAbility(data)
}

const AbilityForm = reduxForm({
  form: 'AbilitiesWithQuantityToProjectForm',
  validate,
  onSubmit: handleSubmitForm
})(Form)

class AbilitiesDialog extends PureComponent {
  render() {
    const { open, toggleModal, submitAbility, abilities } = this.props
    return (
      <Dialog
        open={open}
        onClose={toggleModal}
      >
        <DialogTitle>Create Project</DialogTitle>
        <DialogContent>
          <AbilityForm
            abilities={abilities}
            onClose={toggleModal}
            submitAbility={submitAbility}
          />
        </DialogContent>
      </Dialog>
    )
  }
}

class AbilitiesInputWithQuantity extends PureComponent {
  state = {
    openModal: false
  }

  toggleModal = () => this.setState({ openModal: !this.state.openModal })

  handleAddAbility = data => {
    const { input } = this.props
    const { value = [] } = input
    let values = value || []
    values = values.slice()
    values.push(data)
    input.onChange(values)
    this.toggleModal()
  }

  handleRemoveAbility = abilityId => {
    const { input } = this.props
    const { value = [] } = input
    let values = value || []
    values = values.filter(v => v.abilityId !== abilityId)
    input.onChange(values)
  }

  render() {
    const {
      input,
      label,
      meta: { touched, error },
      helperText = ' ',
      error: customError,
      errorText = null,
      abilities,
      ...custom
    } = this.props
    const { openModal } = this.state

    const { value = [] } = input
    const values = (value || []).map(v => ({
      ...v,
      name: abilities.find(a => a.get('_id') === v.abilityId).get('name')
    }))

    const filteredAbilities = abilities.filter(a => !values.map(v => v.abilityId).includes(a.get('_id')))

    return (
      <FormControl {...custom} error={(!!touched && !!error) || !!errorText || customError}>
        <InputLabel shrink>{label}</InputLabel>
        <Input
          startAdornment={
            <IconButton onClick={this.toggleModal}>
              <AddIcon />
            </IconButton>
          }
          inputComponent={() => (
            <div className={styles.inputComponent}>
              {values.map((v, idx) => (
                <div key={idx} className={styles.chip}>
                  <Chip
                    color="secondary"
                    label={`${v.quantity} ${v.name}`}
                    onDelete={() => this.handleRemoveAbility(v.abilityId)}
                  />
                </div>
              ))}
            </div>
          )}
        />
        <FormHelperText>
          {(touched && error) || errorText || helperText}
        </FormHelperText>
        <AbilitiesDialog
          abilities={filteredAbilities}
          open={openModal}
          toggleModal={this.toggleModal}
          submitAbility={this.handleAddAbility}
        />
      </FormControl>
    )
  }
}

const abilities = createSelector(
  state => state.abilities,
  abilities => abilities.get('data')
)

const selector = createStructuredSelector({
  abilities
})

export default connect(selector)(AbilitiesInputWithQuantity)
