import { combineReducers, Reducer } from "redux"
import { Venue } from "./Interfaces"
import {
    currentResults,
    currentVenue,
    fourSquareResults,
    homeInputState,
    initState,
    seenVenues,
    settingsMenu,
    visitedVenues,
    spinner,
    bottomArea,
    settingsPages,
    loggedIn,
    gps
} from "./reducers/reducers"


export interface Reducers {
    currentVenue: Venue;
    initState: initState;
    loggedIn: loggedIn;
    seenVenues: string[];
    settingsMenu: settingsMenu;
    fourSquareResults: fourSquareResults;
    currentResults: currentResults;
    homeInputState: homeInputState;
    visitedVenues: visitedVenues;
    spinner: boolean;
    bottomArea: bottomArea
    settingsPages: settingsPages;
    gps: gps
}


export const Reducers = combineReducers<Reducers>({
    currentVenue,
    bottomArea,
    initState,
    loggedIn,
    seenVenues,
    settingsMenu,
    fourSquareResults,
    currentResults,
    homeInputState,
    visitedVenues,
    spinner,
    gps,
    settingsPages
})
