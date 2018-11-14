import React, { PureComponent } from 'react'
import { reduxForm, Field, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import Button from '@material-ui/core/Button'

import CustomTextField from 'components/lib/CustomTextField'
import CustomDatePicker from 'components/lib/CustomDatePicker'
import AbilitiesInput from 'components/private/helpers/form/AbilitiesInput'

import styles from './AddProjectForm.scss'

class AddProjectForm extends PureComponent {
  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      invalid,
      onClose,
      error,
      sinceDate
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
              label="Project Name"
              error={!!error}
              errorText={error}
              required
            />
          </div>
          <div className={styles.field}>
            <Field
              component={CustomTextField}
              fullWidth
              error={!!error}
              name="description"
              type="text"
              label="Project Description"
              variant="outlined"
              multiline
              rows="4"
              InputLabelProps={{
                shrink: true
              }}
              required
            />
          </div>
          <div className={styles.field}>
            <Field
              component={CustomDatePicker}
              name="since"
              label="Since"
              error={!!error}
              autoOk
              invalidLabel="Please select"
              required
            />
            <Field
              component={CustomDatePicker}
              name="to"
              label="To"
              error={!!error}
              autoOk
              invalidLabel="Please select"
              disabled={!sinceDate}
              shouldDisableDate={date => date.isBefore(sinceDate)}
              required
            />
          </div>
          <div className={styles.field}>
            <Field
              component={AbilitiesInput}
              fullWidth
              name="abilities"
              type="abilities"
              label="Project Abilities"
              error={!!error}
              errorText={error}
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
  const { name, description, since, to } = values
  if (!name) {
    errors.name = 'Required'
  }
  if (!description) {
    errors.description = 'Required'
  }
  if (!since) {
    errors.since = 'Required'
  }
  if (!to) {
    errors.to = 'Required'
  }
  if (since && to && to.isBefore(since)) {
    errors.to = 'Cannot be earlier than the beginning'
  }
  return errors
}

const handleSubmitForm = (data, dispatch, props) => {
  const { addProject } = props
  addProject(data)
}

const sinceDate = createSelector(
  state => getFormValues('AddProjectForm')(state),
  values => values && values.since
)

const selector = createStructuredSelector({
  sinceDate
})

export default connect(selector)(reduxForm({
  form: 'AddProjectForm',
  validate,
  onSubmit: handleSubmitForm
})(AddProjectForm))
