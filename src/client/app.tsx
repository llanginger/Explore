import * as React from "react"
import * as ReactDOM from "react-dom"
import { createStore, applyMiddleware } from "redux"
import * as thunk from "redux-thunk"
import * as logger from "redux-logger"

import { Store } from "./Store"
import { Body } from "./components/Body"

const middleware = applyMiddleware(thunk, logger())

const fakeArray = [
	"Thing 1",
	"Thing 2",
	"Thing 3",
	"Thing 4"
]

let store = createStore(Store, applyMiddleware(logger()))



ReactDOM.render(
	<Body store={ store }/>,
	document.getElementById("app")
)
