import React, { PureComponent } from 'react'
// import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
// import Paper from 'material-ui/Paper'
// import TextField from 'material-ui/TextField'
// import RaisedButton from 'material-ui/RaisedButton'
// import FlatButton from 'material-ui/FlatButton'
import BachgroundSlider from '../parts/BachgroundSlider'

import './index.scss'

export class Dashboard extends PureComponent {
  render() {
    return (
      <div>
        <BachgroundSlider />
      </div>
    )
  }
}

export default connect(null)(Dashboard)
