import React, { PureComponent } from 'react'
import { reduxForm, Field, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import moment from 'moment'
import Button from '@material-ui/core/Button'

import CustomTextField from 'components/lib/CustomTextField'
import CustomDatePicker from 'components/lib/CustomDatePicker'
import AbilitiesInputWithQuantity from 'components/private/helpers/form/AbilitiesInputWithQuantity'

import styles from './ProjectForm.scss'

class ProjectForm extends PureComponent {
  componentDidMount() {
    const { project, initialize } = this.props
    if (project) {
      const name = project.get('name')
      const description = project.get('description')
      const since = moment(project.get('since'))
      const to = moment(project.get('to'))
      const abilities = project.get('abilities')
      initialize({ name, description, since, to, abilities })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { project: prevProject } = this.props
    const { project, initialized, initialize } = nextProps
    if (!prevProject && project && !initialized) {
      const name = project.get('name')
      const description = project.get('description')
      const since = moment(project.get('since'))
      const to = moment(project.get('to'))
      const abilities = project.get('abilities')
      initialize({ name, description, since, to, abilities })
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
      sinceDate,
      disabled,
      hideBtns
    } = this.props

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
              label="Project Name"
              error={!!error}
              errorText={error}
              required
            />
          </div>
          <div className={styles.field}>
            <Field
              disabled={disabled}
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
              disabled={disabled}
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
              disabled={!sinceDate || disabled}
              shouldDisableDate={date => date.isBefore(sinceDate)}
              required
            />
          </div>
          <div className={styles.field}>
            <Field
              disabled={disabled}
              component={AbilitiesInputWithQuantity}
              fullWidth
              name="abilities"
              type="abilities"
              label="Project Abilities"
              error={!!error}
              errorText={error}
            />
          </div>
          {!hideBtns && <div className={styles.btn}>
            <Button color="secondary" onClick={() => onClose && onClose()}>Cancel</Button>
            <Button disabled={(!disabled || submitting) && (invalid || pristine || submitting)} color="primary" type="submit">Create</Button>
          </div>}
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
  state => getFormValues('ProjectForm')(state),
  values => values && values.since
)

const selector = createStructuredSelector({
  sinceDate
})

export default connect(selector)(reduxForm({
  form: 'ProjectForm',
  validate,
  onSubmit: handleSubmitForm
})(ProjectForm))
