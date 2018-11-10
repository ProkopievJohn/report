import React, { PureComponent } from 'react'
import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import DownIcon from '@material-ui/icons/KeyboardArrowDown'

class ArrowExpandIcon extends PureComponent {
  render() {
    const { expanded, color = 'secondary' } = this.props

    return expanded ? <DownIcon color={color} /> : <RightIcon color={color} />
  }
}

export default ArrowExpandIcon
