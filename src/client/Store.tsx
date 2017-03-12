import { combineReducers, Reducer} from "redux"
import { 
	currentResults,
	fourSquareResults,
	homeInputState,
	initState,
	settingsMenu,
	visitedVenues,
	spinner,
	bottomArea,
    settingsPages
} from "./reducers/reducers"


export interface Reducers {
	initState: initState;
	settingsMenu: settingsMenu;
	fourSquareResults: fourSquareResults;
	currentResults: currentResults;
	homeInputState: homeInputState;
	visitedVenues: visitedVenues;
	spinner: boolean;
	bottomArea: bottomArea
    settingsPages: settingsPages
}


export const Reducers = combineReducers<Reducers>({
	bottomArea,
	initState,
	settingsMenu,
	fourSquareResults,
	currentResults,
	homeInputState,
	visitedVenues,
	spinner,
    settingsPages
})
