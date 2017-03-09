import * as React from "react"
import * as ReactDOM from "react-dom"
import { createStore, applyMiddleware, Store} from "redux"
import * as thunk from "redux-thunk"
import * as logger from "redux-logger"

import { Reducers} from "./Store"
import { Body } from "./components/Body"

import { PresentGoogleMap } from "./components/CreateMap"

const middleware = applyMiddleware(thunk, logger())



const fakeArray = [
	"Thing 1",
	"Thing 2",
	"Thing 3",
	"Thing 4"
]

let store: Store<Reducers> = createStore(Reducers, applyMiddleware(logger()))
console.log("Logging store: ", store)


ReactDOM.render(
	<Body store={ store }/>,
	document.getElementById("app")
)

// ReactDOM.render(
// 	<PresentGoogleMap />,
// 	document.getElementById("app")
// )
