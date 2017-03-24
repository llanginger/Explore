import { combineReducers, Reducer } from "redux"
import { Venue } from "./Interfaces"
import {
    currentResults,
    currentVenue,
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
    currentVenue: Venue;
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
    currentVenue,
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
