import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import myTheme from './myTheme'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import createStore from './store/createStore'
import Main from './components/Main'

class App extends Component {
  render() {
    const store = createStore()
    const theme = createMuiTheme(myTheme)
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <ConnectedRouter history={store.history}>
            <Main />
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App
