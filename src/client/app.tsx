import * as React from "react"
import * as ReactDOM from "react-dom"
import { createStore, applyMiddleware, Store, compose } from "redux"
import { default as thunk } from "redux-thunk";
import * as logger from "redux-logger"

import { Reducers } from "./Store"
import { Body } from "./components/Body"
import { DevTools } from "./components/Devtools"


const enhancer = compose(
    applyMiddleware(thunk, logger()),
    DevTools.instrument()
)


let store: Store<Reducers> = createStore(Reducers, enhancer)
console.log("Logging store: ", store)


ReactDOM.render(
    <div>
        <Body store={store} />
        <DevTools store={store} />
    </div>,
    document.getElementById("app")
)

