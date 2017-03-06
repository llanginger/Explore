import { combineReducers, Reducer } from "redux"
import { 
	currentResults,
	fourSquareResults,
	homeInputState,
	initState,
	settingsMenu,
	visitedVenues,
	spinner
} from "./reducers/reducers"

export const Store = combineReducers({
	initState,
	settingsMenu,
	fourSquareResults,
	currentResults,
	homeInputState,
	visitedVenues,
	spinner
})
