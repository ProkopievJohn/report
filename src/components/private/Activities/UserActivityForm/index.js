import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import { reduxForm, Field, getFormValues } from 'redux-form'
import moment from 'moment'
import Button from '@material-ui/core/Button'

import CustomSelectField from 'components/lib/CustomSelectField'
import CustomDatePicker from 'components/lib/CustomDatePicker'
import CustomTextField from 'components/lib/CustomTextField'

import styles from './UserActivityForm.scss'

class UserActivityForm extends PureComponent {
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
      users,
      project,
      sinceDate
    } = this.props

    const disabled = this.props.hasOwnProperty('disabled') && this.props.disabled !== false
    const projectSince = moment(project.get('since'))
    const projectTo = moment(project.get('to'))

    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <Field
              disabled={disabled}
              component={CustomSelectField}
              values={users.map(user => ({ id: user.get('_id'), name: `${user.get('name')} ${user.get('rate')} $/h` }))}
              fullWidth
              name="userId"
              label="Activity Name"
              error={!!error}
              errorText={error}
              required
            />
          </div>
          <div className={styles.field}>
            <Field
              disabled={disabled}
              component={CustomDatePicker}
              name="since"
              label="Since"
              error={!!error}
              autoOk
              invalidLabel="Please select"
              shouldDisableDate={date => (date.isBefore(projectSince) || date.isAfter(projectTo))}
              required
            />
            <Field
              component={CustomDatePicker}
              name="to"
              label="To"
              error={!!error}
              autoOk
              invalidLabel="Please select"
              disabled={!sinceDate || disabled}
              shouldDisableDate={date => (date.isBefore(sinceDate) || date.isBefore(projectSince) || date.isAfter(projectTo))}
              required
            />
          </div>
          <div className={styles.field}>
            <Field
              component={CustomTextField}
              fullWidth
              name="hours"
              type="number"
              label="Hours"
              error={!!error}
              required
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
  const { userId, since, to, hours } = values
  if (!userId) {
    errors.userId = 'Required'
  }
  if (!since) {
    errors.since = 'Required'
  }
  if (!to) {
    errors.to = 'Required'
  }
  if (!hours) {
    errors.hours = 'Required'
  } else if (hours < 1 || hours > 8) {
    errors.hours = 'Hours must be between 1 and 8'
  }
  return errors
}

const handleSubmitForm = (data, dispatch, props) => {
  const { submitActivity } = props
  submitActivity(data)
}

const abilityId = (state, props) => props.abilityId

const usersActivities = createSelector(
  abilityId,
  state => state.activities.get('data'),
  (abilityId, activities) => activities.filter(activity => activity.get('abilityId') === abilityId).map(a => a.get('userId'))
)

const users = createSelector(
  abilityId,
  state => state.users,
  usersActivities,
  (abilityId, users, usersActivities) => users.get('data').filter(u => (u.get('abilities').includes(abilityId) && !usersActivities.includes(u.get('_id'))))
)

const sinceDate = createSelector(
  state => getFormValues('UserActivityForm')(state),
  values => values && values.since
)

const selector = createStructuredSelector({
  users,
  sinceDate
})

export default connect(selector)(reduxForm({
  form: 'UserActivityForm',
  validate,
  onSubmit: handleSubmitForm
})(UserActivityForm))
