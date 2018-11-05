import React from 'react'
import { DatePicker } from 'material-ui-pickers'

import { DATE_FORMAT } from 'appConstants'

export default ({
  input,
  label,
  meta: { touched, error },
  helperText = ' ',
  error: customError,
  errorText = null,
  format = DATE_FORMAT,
  customClose,
  ...custom
}) => (
  <DatePicker
    label={label}
    error={(!!touched && !!error) || !!errorText || customError}
    helperText={(touched && error) || errorText || helperText}
    format={format}
    animateYearScrolling
    onClose={input.onBlur}
    {...input}
    {...custom}
  />
)
