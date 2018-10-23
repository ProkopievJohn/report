import React from 'react'
import TextField from '@material-ui/core/TextField'

export default ({
  input,
  label,
  meta: { touched, error },
  helperText = ' ',
  error: customError,
  errorText = null,
  ...custom
}) => (
  <TextField
    label={label}
    error={(!!touched && !!error) || !!errorText || customError}
    helperText={(touched && error) || errorText || helperText}
    {...input}
    {...custom}
  />
)
