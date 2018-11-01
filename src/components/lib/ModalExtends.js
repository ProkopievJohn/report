import { PureComponent } from 'react'

export class ModalExtends extends PureComponent {
  static defaultProps = {
    open: false
  }

  handleClose = () => {
    const { open, toggle } = this.props

    open && toggle && toggle()
  }

  render() {
    return null
  }
}

export default ModalExtends
