import { combineReducers, createStore, applyMiddleware, Reducer, Store, compose } from "redux"
import { Venue } from "./Interfaces"
import { default as thunk } from "redux-thunk";
import * as logger from "redux-logger"
import { DevTools } from "./components/Devtools"
import { fireMiddleware, getInitialFireState, clearFireDB, markerMiddleware } from "./actions/actions"
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
    gps,
    markers
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
    gps: gps;
    markers: markers;
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
    markers,
    settingsPages
})

const enhancer = compose(
    applyMiddleware(thunk, fireMiddleware, getInitialFireState, clearFireDB, markerMiddleware, logger()),
    DevTools.instrument()
)

export const store: Store<Reducers> = createStore(Reducers, enhancer)