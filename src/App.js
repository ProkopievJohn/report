import React, { PureComponent } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import myTheme from './myTheme'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import createStore from './store/createStore'
import Main from './components/Main'

class App extends PureComponent {
  render() {
    const store = createStore()
    const theme = createMuiTheme(myTheme)
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <ConnectedRouter history={store.history}>
              <Main />
            </ConnectedRouter>
          </Provider>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    )
  }
}

export default App
