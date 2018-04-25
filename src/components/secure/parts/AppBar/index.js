import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'

class MainAppBar extends PureComponent {
  render() {
    return (
      <div className="app-bar">
        <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
      </div>
    )
  }
}

export default connect()(MainAppBar)
