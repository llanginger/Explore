import { Venue, QueryInfo, User, GooglePlaces, Geometry, StartEnd, Colors, DBInfo, PAction, } from "../Interfaces"
import {
    VenueAction,
    PrevVenueAction,
    VisitedVenueAction,
    MovedMarkerAction,
    FetchedVenuesAction,
    SettingsPageAction,
    LogInAction,
    InputGPSAction,
    LoginErrorAction,
    SetGPSDataAction,
    UpdateProfileInfoAction,
    UpdateProfilePicAction,
    FocusUserMarkerAction,
    ShowDirectionsAction,
    MapLoadedAction,
    ColorUpdateAction
} from "../Interfaces"
import { Action } from "redux"


// --- NO PAYLOAD --- //

export const FETCHING_VENUES: () => Action = () => {
    const action: Action = {
        type: "FETCHING_VENUES"
    }
    return action
}

export const CLEAR_VISITED_VENUES: () => Action = () => {
    const action: Action = {
        type: "CLEAR_VISITED_VENUES"
    }
    return action
}

export const USE_GPS_POS: () => Action = () => {
    const action: Action = {
        type: "USE_GPS_POS"
    }
    return action
}

export const OVERLAY_CLICKED: () => Action = () => {
    const action: Action = {
        type: "OVERLAY_CLICKED"
    }
    return action
}

export const BOTTOM_AREA_BIG: () => Action = () => {
    const action: Action = {
        type: "BOTTOM_AREA_BIG"
    }
    return action
}

export const BOTTOM_AREA_SMALL: () => Action = () => {
    const action: Action = {
        type: "BOTTOM_AREA_SMALL"
    }
    return action
}

export const CLEAR_FAVORITES: () => Action = () => {
    const action: Action = {
        type: "CLEAR_FAVORITES"
    }
    return action
}

export const LOG_OUT: () => Action = () => {
    const action: Action = {
        type: "LOG_OUT"
    }
    return action
}

export const BLUR_INPUT: () => Action = () => {
    const action: Action = {
        type: "BLUR_INPUT"
    }
    return action
}

export const BLUR_GPS: () => Action = () => {
    const action: Action = {
        type: "BLUR_GPS"
    }
    return action
}

export const OPEN_MENU: () => Action = () => {
    const action: Action = {
        type: "OPEN_MENU"
    }
    return action
}

export const CLOSE_MENU: () => Action = () => {
    const action: Action = {
        type: "CLOSE_MENU"
    }
    return action
}

export const FOCUS_INPUT: () => Action = () => {
    const action: Action = {
        type: "FOCUS_INPUT"
    }
    return action
}

export const CLEAR_VENUES: () => Action = () => {
    const action: Action = {
        type: "CLEAR_VENUES"
    }
    return action
}

export const CLOSE_SETTINGS_PAGE: () => Action = () => {
    const action: Action = {
        type: "CLOSE_SETTINGS_PAGE"
    }
    return action
}

export const TOGGLE_BOTTOM_AREA: () => Action = () => {
    const action: Action = {
        type: "TOGGLE_BOTTOM_AREA"
    }
    return action
}

export const DISMISS_MAIN_INPUT_HELP: () => Action = () => {
    const action: Action = {
        type: "DISMISS_MAIN_INPUT_HELP"
    }
    return action
}

export const UPLOADING_PROFILE_PIC: () => Action = () => {
    const action: Action = {
        type: "UPLOADING_PROFILE_PIC"
    }
    return action
}

export const DISMISS_LOGIN_ERROR: () => Action = () => {
    const action: Action = {
        type: "DISMISS_LOGIN_ERRPR"
    }
    return action
}

// --- VENUE PAYLOAD --- //

export const ADD_TO_FAVORITES: (venue: Venue) => VenueAction = (venue: Venue) => {
    const action: VenueAction = {
        type: "ADD_TO_FAVORITES",
        payload: {
            venue
        }
    }
    return action
}

export const REMOVE_FROM_FAVORITES: (venue: Venue) => VenueAction = (venue: Venue) => {
    const action: VenueAction = {
        type: "REMOVE_FROM_FAVORITES",
        payload: {
            venue
        }
    }
    return action
}


export const SHOW_FAVORITE: (venue: Venue) => VenueAction = (venue: Venue) => {
    const action: VenueAction = {
        type: "SHOW_FAVORITE",
        payload: {
            venue
        }
    }
    return action
}

export const NEXT_VENUE: (venue: Venue) => VenueAction = (venue: Venue) => {
    const action: VenueAction = {
        type: "NEXT_VENUE",
        payload: {
            venue
        }
    }
    return action
}

export const LETS_GO: (venue: Venue) => VenueAction = (venue: Venue) => {
    const action: VenueAction = {
        type: "LETS_GO",
        payload: {
            venue
        }
    }
    return action
}

// --- ASSORTED PAYLOADS --- //

export const LOGIN_ERROR: (errorMessage: string) => LoginErrorAction = (errorMessage: string) => {
    const action: LoginErrorAction = {
        type: "LOGIN_ERR0R",
        payload: {
            errorMessage
        }
    }
    return action
}


export const PREV_VENUE: (venue: Venue, oldVenue: Venue) => PrevVenueAction = (venue: Venue, oldVenue: Venue) => {
    const action: PrevVenueAction = {
        type: "PREV_VENUE",
        payload: {
            venue,
            oldVenue
        }
    }
    return action
}

export const VISITED_VENUE: (venue?: Venue, id?: string) => VisitedVenueAction = (venue?: Venue, id?: string) => {
    const action: VisitedVenueAction = {
        type: "VISITED_VENUE",
        payload: {
            venue,
            id
        }
    }
    return action
}

// This one makes the argument for a settings obj
export const FETCHED_VENUES: (venues?: Venue[], visitedVenues?: string[], queryInfo?: QueryInfo) => FetchedVenuesAction = (venues?: Venue[], visitedVenues?: string[], queryInfo?: QueryInfo) => {
    const action: FetchedVenuesAction = {
        type: "FETCHED_VENUES",
        payload: {
            venues,
            visitedVenues,
            queryInfo
        }
    }
    return action
}


export const SHOW_SETTINGS_PAGE: (page: string) => SettingsPageAction = (page: string) => {
    const action: SettingsPageAction = {
        type: "SHOW_SETTINGS_PAGE",
        payload: {
            page
        }
    }
    return action
}


export const LOG_IN: (profileInfo: User, dbInfo?: DBInfo) => LogInAction = (profileInfo: User, dbInfo?: DBInfo) => {
    const action: LogInAction = {
        type: "LOG_IN",
        payload: {
            profileInfo,
            dbInfo
        }
    }
    return action
}



export const INPUT_GPS: (marker: google.maps.Marker) => InputGPSAction = (marker: google.maps.Marker) => {
    const action: InputGPSAction = {
        type: "INPUT_GPS",
        payload: {
            marker
        }
    }
    return action
}

// TODO: FIX THIS ONE
export const SET_GPS_DATA: (gpsData: GooglePlaces) => SetGPSDataAction = (gpsData: GooglePlaces) => {
    const action: SetGPSDataAction = {
        type: "SET_GPS_DATA",
        payload: {
            gpsData
        }
    }
    return action
}

export const UPDATE_PROFILE_INFO: (profileInfo: User) => UpdateProfileInfoAction = (profileInfo: User) => {
    const action: UpdateProfileInfoAction = {
        type: "UPDATE_PROFILE_INFO",
        payload: {
            profileInfo
        }
    }
    return action
}

// Refactor profile pic into profileInfo.profilePic
export const UPDATE_PROFILE_PIC: (profilePic: string) => UpdateProfilePicAction = (profilePic: string) => {
    const action: UpdateProfilePicAction = {
        type: "UPDATE_PROFILE_PIC",
        payload: {
            profilePic
        }
    }
    return action
}

// Rename marker to "position"
export const FOCUS_USER_MARKER: (markerPos: google.maps.LatLng) => FocusUserMarkerAction = (markerPos: google.maps.LatLng) => {
    const action: FocusUserMarkerAction = {
        type: "FOCUS_USER_MARKER",
        payload: {
            markerPos
        }
    }
    return action
}

export const MOVED_MARKER: (marker: google.maps.Marker) => MovedMarkerAction = (marker: google.maps.Marker) => {
    const action: MovedMarkerAction = {
        type: "MOVED_MARKER",
        payload: {
            marker
        }
    }
    return action
}

export const SHOW_DIRECTIONS: (startEnd: StartEnd) => ShowDirectionsAction = (startEnd: StartEnd) => {
    const action: ShowDirectionsAction = {
        type: "SHOW_DIRECTIONS",
        payload: {
            startEnd
        }
    }
    return action
}

export const MAP_LOADED: (mapRef: google.maps.Map, directionsRenderer: google.maps.DirectionsRenderer, directionsService: google.maps.DirectionsService) => MapLoadedAction = (mapRef: google.maps.Map, directionsRenderer: google.maps.DirectionsRenderer, directionsService: google.maps.DirectionsService) => {
    const action: MapLoadedAction = {
        type: "MAP_LOADED",
        payload: {
            mapOpts: {
                mapRef,
                directionsRenderer,
                directionsService
            }
        }
    }
    return action
}


export const COLOR_UPDATE: (color: Colors) => ColorUpdateAction = (color: Colors) => {
    const action: ColorUpdateAction = {
        type: "COLOR_UPDATE",
        payload: {
            color
        }
    }
    return action
}






