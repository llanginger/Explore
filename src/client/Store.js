import { combineReducers } from "redux"

const initState = (state = "init", action) {
	switch (action.type) {
		default:
			return state
	}
}

const appState = combineReducers({
	initState
})

export default appState
