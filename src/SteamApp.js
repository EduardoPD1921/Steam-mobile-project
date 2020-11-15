import React from 'react'
import Router from './Router'

import { applyMiddleware, createStore } from 'redux'
import reduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

import { composeWithDevTools } from 'remote-redux-devtools'

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(reduxThunk)
))


export default props => {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    )
}