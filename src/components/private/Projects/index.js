import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'

import styles from './Projects.scss'

class Projects extends PureComponent {
  render() {
    const { projects } = this.props

    return (
      <Fragment>
        {projects.map(project => {
          const id = project.get('_id')
          const name = project.get('name')

          return (
            <div key={id} className={styles.temp}>{id} {name}</div>
          )
        })}
      </Fragment>
    )
  }
}

const projects = createSelector(
  state => state.projects,
  projects => projects.get('data')
)

const selector = createStructuredSelector({
  projects
})

export default connect(selector, {
  // toggleEditModal: createAction(UI.MODAL.ABILITY.EDIT),
  // toggleRemoveModal: createAction(UI.MODAL.ABILITY.REMOVE)
})(Projects)
