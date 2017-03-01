import { combineReducers, Reducer } from "redux"


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

const visited = (state = [], action) => {
	switch (action.type) {
		case "REMOVE_VENUE":
			return "Removing venue"
		case "UNDO_REMOVE_VENUE":
			return "Undoing remove venue"
		default:
			return state
	}
}

const currentResults = (state = { queryInfo: {}, results: [] }, action) => {
	switch (action.type) {
		case "FETCHED_VENUES":
			return action.payload
		case "CLEAR_VENUES":
			return { queryInfo: {}, results: [] }
		default:
			return state
	}
}

const fourSquareResults = (state = [{ queryInfo: {}, results: [] }], action) => {
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
	fourSquareResults,
	visited,
	currentResults
})
