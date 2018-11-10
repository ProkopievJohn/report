import React, { PureComponent } from 'react'
import { reduxForm, Field } from 'redux-form'
import Button from '@material-ui/core/Button'

import CustomTextField from 'components/lib/CustomTextField'

import styles from './AbilityForm.scss'

class AbilityForm extends PureComponent {
  componentDidMount() {
    const { ability, initialize } = this.props
    if (ability) {
      const name = ability.get('name')
      const description = ability.get('description')
      initialize({ name, description })
    }
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
      cancelText = 'Cancel'
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
              label="Ability Name"
              error={!!error}
              errorText={error}
              required
              customizeValue={v => v.toUpperCase()}
            />
          </div>
          <div className={styles.field}>
            <Field
              disabled={disabled}
              component={CustomTextField}
              fullWidth
              name="description"
              type="text"
              label="Ability Description"
              variant="outlined"
              multiline
              rows="4"
              InputLabelProps={{
                shrink: true
              }}
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
  const { name } = values
  if (!name) {
    errors.name = 'Required'
  }
  return errors
}

const handleSubmitForm = (data, dispatch, props) => {
  const { submitAbility } = props
  submitAbility(data)
}

export default reduxForm({
  form: 'AbilityForm',
  validate,
  onSubmit: handleSubmitForm
})(AbilityForm)
