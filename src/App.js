import React, { PureComponent } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch } from 'react-router-dom'
import createStore from './store/createStore'
import Main from './components/Main'

class App extends PureComponent {
  render() {
    const store = createStore()
    return (
      <MuiThemeProvider>
        <Provider store={store} >
          <ConnectedRouter store={store} history={store.history}>
            <Switch>
              <Route component={Main} />
            </Switch>
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App
