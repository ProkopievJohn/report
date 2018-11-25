import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'

import styles from './Users.scss'

class Users extends PureComponent {
  render() {
    const { users } = this.props

    return (
      <Fragment>
        {users.map(user => {
          const id = user.get('_id')
          const name = user.get('name')

          return (
            <div key={id} className={styles.temp}>{id} {name}</div>
          )
        })}
      </Fragment>
    )
  }
}

const users = createSelector(
  state => state.users,
  users => users.get('data')
)

const selector = createStructuredSelector({
  users
})

export default connect(selector, {
  // toggleEditModal: createAction(UI.MODAL.ABILITY.EDIT),
  // toggleRemoveModal: createAction(UI.MODAL.ABILITY.REMOVE)
})(Users)
