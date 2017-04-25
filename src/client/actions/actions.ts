import { Venue, QueryInfo, User, GooglePlaces, Colors, DBInfo, PAction } from "../Interfaces"
import { Action } from "redux"

export interface SimpleAction {
    type: string;
}

export interface AWithVenue extends SimpleAction {
    venue: Venue;
}

export interface AWithQueryInfo extends SimpleAction {
    venues: Venue[];
    queryInfo: QueryInfo;
}

export const FETCHING_VENUES: () => PAction = () => {
    return {
        type: "FETCHING_VENUES"
    }
}

export const CLEAR_VISITED_VENUES: () => PAction = () => {
    return {
        type: "CLEAR_VISITED_VENUES"
    }
}

// This one makes the argument for a settings obj
export const FETCHED_VENUES: (venues?: Venue[], visitedVenues?: string[], queryInfo?: QueryInfo) => Action = (venues?: Venue[], visitedVenues?: string[], queryInfo?: QueryInfo) => {
    return {
        type: "FETCHED_VENUES",
        payload: {
            venues,
            visitedVenues,
            queryInfo
        }
    }
}

export const TOGGLE_BOTTOM_AREA: () => PAction = () => {
    return {
        type: "TOGGLE_BOTTOM_AREA"
    }
}


export const NEXT_VENUE: (venue?: Venue) => PAction = (venue?: Venue) => {
    return {
        type: "NEXT_VENUE",
        payload: {
            venue
        }
    }
}

export const PREV_VENUE: (venue: Venue, oldVenue: Venue) => PAction = (venue: Venue, oldVenue: Venue) => {
    return {
        type: "PREV_VENUE",
        payload: {
            venue,
            oldVenue
        }
    }
}

export const OPEN_MENU: () => PAction = () => {
    return {
        type: "OPEN_MENU"
    }
}

export const CLOSE_MENU: () => PAction = () => {
    return {
        type: "CLOSE_MENU"
    }
}

export const FOCUS_INPUT: () => PAction = () => {
    return {
        type: "FOCUS_INPUT"
    }
}

export const CLEAR_VENUES: () => PAction = () => {
    return {
        type: "CLEAR_VENUES"
    }
}

export const CLOSE_SETTINGS_PAGE: () => PAction = () => {
    return {
        type: "CLOSE_SETTINGS_PAGE"
    }
}

export const SHOW_SETTINGS_PAGE: (page: string) => PAction = (page: string) => {
    return {
        type: "SHOW_SETTINGS_PAGE",
        payload: {
            page
        }
    }
}

export const VISITED_VENUE: (venue?: Venue, id?: string) => PAction = (venue?: Venue, id?: string) => {
    return {
        type: "VISITED_VENUE",
        payload: {
            venue,
            id
        }
    }
}

export const LETS_GO: (venue: Venue) => PAction = (venue: Venue) => {
    return {
        type: "LETS_GO",
        payload: {
            venue
        }
    }
}

export const DISMISS_MAIN_INPUT_HELP: () => PAction = () => {
    return {
        type: "DISMISS_MAIN_INPUT_HELP"
    }
}

export const LOG_IN: (profileInfo: User, dbInfo?: DBInfo) => PAction = (profileInfo: User, dbInfo?: DBInfo) => {
    return {
        type: "LOG_IN",
        payload: {
            profileInfo,
            dbInfo
        }
    }
}

export const LOG_OUT: () => PAction = () => {
    return { type: "LOG_OUT" }
}

export const BLUR_INPUT: () => PAction = () => {
    return { type: "BLUR_INPUT" }
}

export const INPUT_GPS: (marker: google.maps.Marker) => PAction = (marker: google.maps.Marker) => {
    return {
        type: "INPUT_GPS",
        payload: {
            marker
        }
    }
}

export const BLUR_GPS: () => PAction = () => {
    return { type: "BLUR_GPS" }
}

export const SET_GPS_DATA: (gpsData: GooglePlaces) => PAction = (gpsData: GooglePlaces) => {
    return { type: "SET_GPS_DATA", gpsData }
}

export const UPDATE_PROFILE_INFO: (profileInfo: User) => PAction = (profileInfo: User) => {
    return {
        type: "UPDATE_PROFILE_INFO",
        payload: {
            profileInfo
        }
    }
}

// Refactor profile pic into profileInfo.profilePic
export const UPDATE_PROFILE_PIC: (profilePic: string) => PAction = (profilePic: string) => {
    return {
        type: "UPDATE_PROFILE_PIC",
        payload: {
            profilePic
        }
    }
}

// Rename marker to "position"
export const FOCUS_USER_MARKER: (markerPos: google.maps.LatLng) => PAction = (markerPos: google.maps.LatLng) => {
    return {
        type: "FOCUS_USER_MARKER",
        payload: {
            markerPos
        }
    }
}

export const MOVED_MARKER: (marker: google.maps.Marker) => PAction = (marker: google.maps.Marker) => {
    return {
        type: "MOVED_MARKER",
        payload: {
            marker
        }
    }
}

export const SHOW_DIRECTIONS: (startEnd: {}) => PAction = (startEnd: {}) => {
    return {
        type: "SHOW_DIRECTIONS",
        payload: {
            startEnd
        }
    }
}

export const MAP_LOADED: (mapRef: google.maps.Map, directionsRenderer: google.maps.DirectionsRenderer, directionsService: google.maps.DirectionsService) => PAction = (mapRef: google.maps.Map, directionsRenderer: google.maps.DirectionsRenderer, directionsService: google.maps.DirectionsService) => {
    return {
        type: "MAP_LOADED",
        payload: {
            mapOpts: {
                mapRef,
                directionsRenderer,
                directionsService
            }
        }
    }
}

export const USE_GPS_POS: () => PAction = () => {
    return {
        type: "USE_GPS_POS"
    }
}

export const OVERLAY_CLICKED: () => PAction = () => {
    return {
        type: "OVERLAY_CLICKED"
    }
}

export const BOTTOM_AREA_BIG: () => PAction = () => {
    return {
        type: "BOTTOM_AREA_BIG"
    }
}

export const BOTTOM_AREA_SMALL: () => PAction = () => {
    return {
        type: "BOTTOM_AREA_SMALL"
    }
}

export const COLOR_UPDATE: (color: Colors) => PAction = (color: Colors) => {
    return {
        type: "COLOR_UPDATE",
        payload: {
            color
        }
    }
}

export const UPLOADING_PROFILE_PIC: () => PAction = () => {
    return {
        type: "UPLOADING_PROFILE_PIC"
    }
}

export const ADD_TO_FAVORITES: (venue: Venue) => PAction = (venue: Venue) => {
    return {
        type: "ADD_TO_FAVORITES",
        payload: {
            venue
        }
    }
}

export const REMOVE_FROM_FAVORITES: (venue: Venue) => PAction = (venue: Venue) => {
    return {
        type: "REMOVE_FROM_FAVORITES",
        payload: {
            venue
        }
    }
}


export const SHOW_FAVORITE: (venue: Venue) => PAction = (venue: Venue) => {
    return {
        type: "SHOW_FAVORITE",
        payload: {
            venue
        }
    }
}

export const CLEAR_FAVORITES: () => PAction = () => {
    return {
        type: "CLEAR_FAVORITES"
    }
}