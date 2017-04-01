import { Venue, QueryInfo, User, GooglePlaces } from "../Interfaces"
import { Action } from "redux"
export { fireMiddleware, getInitialFireState } from "./fireMiddleware"

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

export const FETCHING_VENUES: () => Action = () => {
    return {
        type: "FETCHING_VENUES"
    }
}

export const CLEAR_VISITED_VENUES: () => Action = () => {
    return {
        type: "CLEAR_VISITED_VENUES"
    }
}

export const FETCHED_VENUES: (venues: Venue[], queryInfo: QueryInfo) => Action = (venues: Venue[], queryInfo: QueryInfo) => {
    return {
        type: "FETCHED_VENUES",
        venues,
        queryInfo,
    }
}

export const TOGGLE_BOTTOM_AREA: () => Action = () => {
    return {
        type: "TOGGLE_BOTTOM_AREA"
    }
}

export const NEXT_VENUE: (venue?: Venue) => Action = (venue?: Venue) => {
    return {
        type: "NEXT_VENUE",
        venue
    }
}

export const PREV_VENUE: (venue?: Venue) => Action = (venue?: Venue) => {
    return {
        type: "PREV_VENUE",
        venue
    }
}

export const OPEN_MENU: () => Action = () => {
    return {
        type: "OPEN_MENU"
    }
}

export const CLOSE_MENU: () => Action = () => {
    return {
        type: "CLOSE_MENU"
    }
}

export const FOCUS_INPUT: () => Action = () => {
    return {
        type: "FOCUS_INPUT"
    }
}

export const CLEAR_VENUES: () => Action = () => {
    return {
        type: "CLEAR_VENUES"
    }
}

export const CLOSE_SETTINGS_PAGE: () => Action = () => {
    return {
        type: "CLOSE_SETTINGS_PAGE"
    }
}

export const SHOW_SETTINGS_PAGE: (page: string) => Action = (page: string) => {
    return {
        type: "SHOW_SETTINGS_PAGE",
        page
    }
}

export const VISITED_VENUE: (venue?: Venue, id?: string) => Action = (venue?: Venue, id?: string) => {
    return {
        type: "VISITED_VENUE",
        venue,
        id
    }
}

export const LETS_GO: (venue: Venue) => Action = (venue: Venue) => {
    return {
        type: "LETS_GO",
        venue
    }
}

export const DISMISS_MAIN_INPUT_HELP: () => Action = () => {
    return {
        type: "DISMISS_MAIN_INPUT_HELP"
    }
}

export const LOG_IN: (user: User) => Action = (user: User) => {
    return { type: "LOG_IN", user: user }
}

export const LOG_OUT: () => Action = () => {
    return { type: "LOG_OUT" }
}

export const BLUR_INPUT: () => Action = () => {
    return { type: "BLUR_INPUT" }
}

export const INPUT_GPS: () => Action = () => {
    return { type: "INPUT_GPS" }
}

export const SET_GPS_DATA: (gpsData: GooglePlaces) => Action = (gpsData: GooglePlaces) => {
    return { type: "SET_GPS_DATA", gpsData }
}