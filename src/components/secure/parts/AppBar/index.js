import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class AppBar extends PureComponent {
  render() {
    return (
      <div className="app-bar">appbar</div>
    )
  }
}

export default connect()(AppBar)
