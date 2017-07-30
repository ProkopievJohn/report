import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import createStore from './store/createStore'

class App extends Component {
  render () {
    const store = createStore()
    return (
      <MuiThemeProvider>
        <Provider store={store} >
          <div className="mycomp">
            falsdkfjalskdfjalk
          </div>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App
