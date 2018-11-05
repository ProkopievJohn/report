import React, { PureComponent } from 'react'
import { reduxForm, Field } from 'redux-form'
import Button from '@material-ui/core/Button'

import CustomTextField from 'components/lib/CustomTextField'

import styles from './AddAbilityForm.scss'

class AddAbilityForm extends PureComponent {
  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      invalid,
      onClose,
      error
    } = this.props

    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <Field
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
            <Button color="secondary" onClick={() => onClose && onClose()}>Cancel</Button>
            <Button disabled={invalid || pristine || submitting} color="primary" type="submit">Create</Button>
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
  const { addAbility } = props
  addAbility(data)
}

export default reduxForm({
  form: 'AddAbilityForm',
  validate,
  onSubmit: handleSubmitForm
})(AddAbilityForm)
