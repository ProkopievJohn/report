import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'

class Dashboard extends PureComponent {
  render() {
    // const { activities } = this.props
    // console.log('activities: ', activities.toJS())
    return (
      <div>Dashboard</div>
    )
  }
}

const activities = createSelector(
  state => state.activities,
  activities => activities.get('data')
)

const selector = createStructuredSelector({
  activities
})

export default connect(selector)(Dashboard)
