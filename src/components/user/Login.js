import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'material-ui'
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
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="email" component={renderTextField} label="Email" />
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting}>Clear Values</button>
        </div>
      </form>
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
