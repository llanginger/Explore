import { Venue, QueryInfo } from "../Interfaces"
import { Action } from "redux"

export const FETCHING_VENUES = () => {
    return {
        type: "FETCHING_VENUES"
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