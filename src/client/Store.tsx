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

const currentResults = (state = { queryInfo: {}, results: [] }, action) => {
	switch (action.type) {
		case "VISITED_VENUE":
			const newState = state.results.map((venue) => {
				if (venue.id === action.id) {
					return {...venue, visited: true}
				} else {
					return venue
				}
			})

			return {...state, results: newState}
		case "FETCHED_VENUES":
			return action.payload
		case "CLEAR_VENUES":
			return { queryInfo: {}, results: [] }
		default:
			return state
	}
}

const homeInputState = (state = { active: false }, action) => {
	switch (action.type) {
		case "FOCUS_INPUT":
		case "CLEAR_VENUES":
			return { active: true }
		case "BLUR_INPUT":
			return { active: false }
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
	currentResults,
	homeInputState
})
