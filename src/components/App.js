import React from 'react'

// Redux
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { loadData, saveData } from '../localStorage'

// Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import MainReducer from '../reducers/main'
// import { fetchUserInfo } from "./actions/user";
// import { checkTokenInCookies } from "./actions/authenticate";

// Components
import Profile from './Profile'
import Categories from './Categories'
import TipPreview from './TipPreview'
import NewTip from './NewTip'
import Tip from './Tip'
import ErrorMessages from './ErrorMessages'
import EditFormsy from './Profile/EditProfile'

import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

const userIsAuthenticated = connectedRouterRedirect({
  // The url to redirect user to if they fail
  redirectPath: '/categories',
  // If selector is true, wrapper will not redirect
  // For example let's check that state contains user data
  authenticatedSelector: state => !!state.profile.userData,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated'
})

const loggerMiddleware = createLogger()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Get state from local storage
const persistedState = loadData('state')

// Refreshing should clear any errors
persistedState && delete persistedState.errors

const store = createStore(
  MainReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
)

store.subscribe(() => {
  saveData('state', store.getState())
})

// if (store.dispatch(checkTokenInCookies())) {
//     const token = store.getState().authenticate.token
//     store.dispatch(fetchUserInfo(token));
// }

export default () => {
  return (
    <Provider store={store}>
      <div>
        <ErrorMessages />
        <Router>
          <Switch>
            <Route component={Categories} exact path='/' />
            <Route component={TipPreview} path='/categories/:category' />
            <Route component={Categories} path='/categories' />
            <Route component={userIsAuthenticated(NewTip)} path='/tips/new' />
            <Route component={Tip} path='/tips/:id' />
            <Route path='/profile' component={userIsAuthenticated(Profile)} />
          </Switch>
        </Router>
      </div>
    </Provider>
  )
}
