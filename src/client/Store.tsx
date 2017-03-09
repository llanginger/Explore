import { combineReducers, Reducer} from "redux"
import { 
	currentResults,
	fourSquareResults,
	homeInputState,
	initState,
	settingsMenu,
	visitedVenues,
	spinner,
	bottomArea
} from "./reducers/reducers"


export interface Reducers {
	initState: initState;
	settingsMenu: string;
	fourSquareResults: fourSquareResults;
	currentResults: currentResults;
	homeInputState: homeInputState;
	visitedVenues: visitedVenues;
	spinner: boolean;
	bottomArea: bottomArea
}


export const Reducers = combineReducers<Reducers>({
	bottomArea,
	initState,
	settingsMenu,
	fourSquareResults,
	currentResults,
	homeInputState,
	visitedVenues,
	spinner
})
