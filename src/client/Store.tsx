import { Action, combineReducers, createStore, applyMiddleware, Reducer, Store, compose } from "redux"
import { Venue } from "./Interfaces"
import { default as thunk } from "redux-thunk";
import * as logger from "redux-logger"
import { DevTools } from "./components/Devtools"
import { fireMiddleware, markerMiddleware, syncLocationInfo, naviMiddleware, directionsMiddleware } from "./actions/actions"
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
    userReducer,
    map
} from "./reducers/reducers"


export interface Reducers {
    currentVenue: currentVenue;
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
    userReducer: userReducer;
    map: map;
}

console.log("CurrentVenue from Store: ", currentVenue);
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
    userReducer,
    map,
    settingsPages
})

const enhancer = compose(
    applyMiddleware(thunk, fireMiddleware, markerMiddleware, syncLocationInfo, naviMiddleware, directionsMiddleware, logger()),
    DevTools.instrument()
)

export const store: Store<Reducers> = createStore(Reducers, enhancer)
console.log("Store: ", store);
console.log("Reducers: ", Reducers);