import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import { TextField, Paper } from 'material-ui'
import { connect } from 'react-redux'

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class Login extends PureComponent {
  render() {
    const { handleSubmit, pristine, submitting } = this.props
    return (
      <div className="flex-container row justify-center">
        <Paper zDepth={3} className="container">
          <form onSubmit={handleSubmit}>
            <div>
              <Field name="email" component={renderTextField} label="Email" className="field" />
            </div>
            <div>
              <button type="submit" disabled={pristine || submitting}>Submit</button>
              <button type="button" disabled={pristine || submitting}>Clear Values</button>
            </div>
          </form>
        </Paper>
      </div>
    )
  }
}

const handleSubmitForm = (data, dispatch, props) => {
  console.log('data: ', data)
}

const LoginForm = reduxForm({
  form: 'StartForm',
  onSubmit: handleSubmitForm
})(Login)

export default connect(
  state => ({
    state
  })
)(LoginForm)
