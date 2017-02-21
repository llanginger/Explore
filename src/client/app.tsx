import * as React from "react"
import * as ReactDOM from "react-dom"
import { createStore, applyMiddleware } from "redux"
import * as thunk from "redux-thunk"
import * as logger from "redux-logger"

import { InputTest } from "./components/input"
import { Hamburger } from "./components/Hamburger"
import { appState } from "./Store"

// const middleware = applyMiddleware(thunk, logger())



const MainBody = (props) => {
	return(
		<div
			id="mainApp"
			style={{
				position: "relative",
				width: "375px",
				height: "667px",
				marginLeft: "100px"
		}}>
			<InputTest
				style={{marginTop: "100px"}}
				placeholder={"What Do You Want?"}
				disabled={false}
			/>
			<Hamburger store={props.store}/>
		</div>
	)
}

const Hello = (props) => {
	return (
		<div>
			Hello {props.name}
		</div>
	)
}



ReactDOM.render(<MainBody store={ createStore(appState)}/>, document.getElementById("app"))
