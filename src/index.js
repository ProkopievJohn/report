import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import injectTapEventPlugin from 'react-tap-event-plugin'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
injectTapEventPlugin()
registerServiceWorker()
