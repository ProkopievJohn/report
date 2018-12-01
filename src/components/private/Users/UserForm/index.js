import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import { reduxForm, Field } from 'redux-form'
import isEmail from 'validator/lib/isEmail'

import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import InputAdornment from '@material-ui/core/InputAdornment'

import CustomTextField from 'components/lib/CustomTextField'
import CustomSelectField from 'components/lib/CustomSelectField'

import { ROLE_ADMIN, ROLE_USER } from 'appConstants'

import styles from './UserForm.scss'

class UserForm extends PureComponent {
  handleRenderAbilitiesVaues = values => {
    const { abilities } = this.props
    return (
      <div className={styles.inputComponent}>
        {values.map((v, idx) => (
          <div key={idx} className={styles.chip}>
            <Chip
              color="secondary"
              label={abilities.find(a => a.get('_id') === v).get('name')}
            />
          </div>
        ))}
      </div>
    )
  }
  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      invalid,
      onClose,
      error,
      submitText = 'Submit',
      cancelText = 'Cancel',
      abilities
    } = this.props

    const disabled = this.props.hasOwnProperty('disabled') && this.props.disabled !== false

    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <Field
              disabled={disabled}
              component={CustomTextField}
              fullWidth
              name="name"
              type="text"
              label="User Name"
              error={!!error}
              errorText={error}
              required
            />
          </div>
          <div className={styles.field}>
            <Field
              component={CustomTextField}
              fullWidth
              name="rate"
              type="number"
              label="Rate"
              error={!!error}
              required
              InputProps={{
                endAdornment: <InputAdornment position="end">$/h</InputAdornment>
              }}
            />
          </div>
          <div className={styles.field}>
            <Field
              component={CustomSelectField}
              fullWidth
              values={[{ id: ROLE_USER, name: 'User' }, { id: ROLE_ADMIN, name: 'Admin' }]}
              name="role"
              label="Role"
              error={!!error}
              required
            />
          </div>
          <div className={styles.field}>
            <Field
              component={CustomTextField}
              fullWidth
              name="email"
              type="email"
              label="Email"
              error={!!error}
              required
            />
          </div>
          <div className={styles.field}>
            <Field
              component={CustomTextField}
              fullWidth
              name="confirmEmail"
              type="email"
              label="Confirm Email"
              error={!!error}
              required
            />
          </div>
          <div className={styles.field}>
            <Field
              component={CustomSelectField}
              multiple
              values={abilities.map(ability => ({ id: ability.get('_id'), name: ability.get('name') }))}
              fullWidth
              name="abilities"
              type="abilities"
              label="User Abilities"
              error={!!error}
              required
              renderValue={this.handleRenderAbilitiesVaues}
            />
          </div>
          <div className={styles.btn}>
            {onClose && <Button color="secondary" onClick={onClose}>{cancelText}</Button>}
            <Button
              disabled={(!disabled || submitting) && (invalid || pristine || submitting)}
              color="primary"
              type="submit"
            >
              {submitText}
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

const validate = (values, props) => {
  const errors = {}
  const { name, email, confirmEmail, abilities, rate } = values
  if (!name) {
    errors.name = 'Required'
  }
  if (!email) {
    errors.email = 'Required'
  }
  if (!confirmEmail) {
    errors.confirmEmail = 'Required'
  }
  if (email && !isEmail(email)) {
    errors.email = 'Please provide a valid email'
  }
  if (email && confirmEmail && email !== confirmEmail) {
    errors.confirmEmail = 'Email does not match'
  }
  if (!abilities || !abilities.length) {
    errors.abilities = 'Required'
  }
  if (!rate) {
    errors.rate = 'Required'
  }
  return errors
}

const handleSubmitForm = (data, dispatch, props) => {
  const { submitUser } = props
  submitUser(data)
}

const abilities = createSelector(
  state => state.abilities,
  abilities => abilities.get('data')
)

const selector = createStructuredSelector({
  abilities
})

export default connect(selector)(reduxForm({
  form: 'UserForm',
  validate,
  onSubmit: handleSubmitForm
})(UserForm))
