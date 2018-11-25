import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

export default ({
  input,
  label,
  meta: { touched, error },
  helperText = ' ',
  error: customError,
  errorText = null,
  renderValue = selected => selected.join('; '),
  multiple,
  ...custom
}) => (
  <FormControl error={(!!touched && !!error) || !!errorText || customError} {...custom}>
    <InputLabel>{label}</InputLabel>
    <Select
      {...input}
      value={multiple ? (input.value || []) : input.value}
      multiple={multiple}
      renderValue={multiple ? renderValue : undefined}
    >
      {custom.values.map(v => (<MenuItem key={v.id} value={v.id}>{v.name}</MenuItem>))}
    </Select>
    <FormHelperText>{(touched && error) || errorText || helperText}</FormHelperText>
  </FormControl>
)
