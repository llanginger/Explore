import { combineReducers } from "redux"

const initState = (state = "init", action) => {
	switch (action.type) {
		default:
			return state
	}
}

const settingsMenu = (state = "CLOSE_MENU", action) => {
	switch (action.type) {
		case "OPEN_MENU":
			return action.type;
		case "CLOSE_MENU":
			return action.type;
		default:
			return state
	}
}

const fourSquareResults = (state = [], action) => {
	switch (action.type) {
		case "FETCHING_VENUES":
			return state
		case "FETCHED_VENUES":
			return [...state, action.payload]
		default:
			return state
	}
}

export const appState = combineReducers({
	initState,
	settingsMenu,
	fourSquareResults
})
