import React, { PureComponent } from 'react'
import DoneIcon from '@material-ui/icons/Done'
import BlockIcon from '@material-ui/icons/Block'
import DeleteIcon from '@material-ui/icons/Delete'

import { STATUS_ACTIVE, STATUS_INACTIVE, STATUS_DELETED } from 'appConstants'

class StatusIcon extends PureComponent {
  render() {
    const { status } = this.props
    if (status === STATUS_ACTIVE) {
      return <DoneIcon color="secondary" />
    }
    if (status === STATUS_INACTIVE) {
      return <BlockIcon color="secondary" />
    }
    if (status === STATUS_DELETED) {
      return <DeleteIcon color="secondary" />
    }
    return null
  }
}

export default StatusIcon
