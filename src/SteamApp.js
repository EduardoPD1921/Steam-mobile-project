import React from 'react'
import Router from './Router'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

import devToolsEnhancer from 'remote-redux-devtools'

const store = createStore(rootReducer, devToolsEnhancer())

export default props => {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    )
}