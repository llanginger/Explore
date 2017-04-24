import { Action, combineReducers, createStore, applyMiddleware, Reducer, Store, compose } from "redux"
import { Venue } from "./Interfaces"
import { default as thunk } from "redux-thunk";
import * as logger from "redux-logger"
import { DevTools } from "./components/Devtools"
import {
    fireVenueMiddleware,
    fireFavoritesMiddleware,
    markerMiddleware,
    syncLocationInfo,
    naviMiddleware,
    directionsMiddleware,
    fetchingMiddleware
} from "./actions/actions"
import {
    currentResults,
    currentVenue,
    fourSquareResults,
    fetchingVenues,
    homeInputState,
    initState,
    seenVenues,
    settingsMenu,
    visitedVenues,
    spinner,
    overlay,
    bottomArea,
    settingsPages,
    loggedIn,
    favorites,
    gps,
    colors,
    userReducer,
    map
} from "./reducers/reducers"


export interface Reducers {
    currentVenue: currentVenue;
    favorites: favorites;
    initState: initState;
    loggedIn: loggedIn;
    seenVenues: string[];
    settingsMenu: settingsMenu;
    fourSquareResults: fourSquareResults;
    fetchingVenues: fetchingVenues;
    currentResults: currentResults;
    homeInputState: homeInputState;
    visitedVenues: visitedVenues;
    spinner: spinner;
    overlay: overlay;
    colors: colors;
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
    favorites,
    seenVenues,
    settingsMenu,
    fourSquareResults,
    fetchingVenues,
    overlay,
    currentResults,
    homeInputState,
    visitedVenues,
    spinner,
    colors,
    gps,
    userReducer,
    map,
    settingsPages
})

const enhancer = compose(
    applyMiddleware(
        thunk,
        fireVenueMiddleware,
        fireFavoritesMiddleware,
        markerMiddleware,
        syncLocationInfo,
        naviMiddleware,
        // fetchingMiddleware,
        directionsMiddleware,
        logger()
    ),
    DevTools.instrument()
)

export const store: Store<Reducers> = createStore(Reducers, enhancer) as Store<Reducers>
console.log("Store: ", store);
console.log("Reducers: ", Reducers);