import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'

class Abilities extends PureComponent {
  render() {
    const { abilities } = this.props
    return (
      <div>
        {abilities.map(a => {
          console.log('=', a)
          return <div key={a.get('_id')}>{a.get('name')}</div>
        })}
      </div>
    )
  }
}

const abilities = createSelector(
  state => state.abilities,
  abilities => abilities.get('data')
)

const abilitiesLoading = createSelector(
  state => state.abilities,
  abilities => abilities.get('loading')
)

const abilitiesError = createSelector(
  state => state.abilities,
  abilities => abilities.get('error')
)

const selector = createStructuredSelector({
  abilities,
  abilitiesLoading,
  abilitiesError
})

export default connect(selector)(Abilities)
