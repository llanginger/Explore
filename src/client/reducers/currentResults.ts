import { Reducer } from "redux"
import { Venue, QueryInfo, PAction } from "../Interfaces"

export interface currentResults {
    queryInfo?: {};
    venues: Venue[]
}


const initState = {
    queryInfo: {},
    venues: []
}

export const currentResults: Reducer<currentResults> = (state: currentResults = initState, action: PAction) => {
    switch (action.type) {
        case "VISITED_VENUE":
            const newVisitedState = state.venues.map((venue) => {
                if (venue.id === action.payload.id) {
                    return { ...venue, visited: true }
                } else {
                    return venue
                }
            })

            return { ...state, venues: newVisitedState }
        case "LETS_GO":
        case "NEXT_VENUE":
            const nextSeenState = state.venues.map((venue) => {
                if (venue.id === action.payload.venue.id) {
                    return { ...venue, seen: true }
                } else {
                    return venue
                }
            })
            return { ...state, venues: nextSeenState }
        case "PREV_VENUE":
            const prevSeenState = state.venues.map((venue) => {
                if (venue.id === action.payload.oldVenue.id) {
                    return { ...venue, seen: false }
                } else {
                    return venue
                }
            })
            return { ...state, venues: prevSeenState }
        case "SHOW_FAVORITE":
            return {
                ...state,
                venues: [
                    ...state.venues,
                    action.payload.venue
                ]
            }
        case "FETCHED_VENUES":
            // -- Change this to filter against visited venues list and simply not populate currentvenues with any already-seen venues

            return {
                ...state,
                queryInfo: action.payload.queryInfo,
                venues: action.payload.venues.filter((venue) => {
                    return (action.payload.visitedVenues.indexOf(venue.id) === -1)
                })
            }
        case "CLEAR_VENUES":
        case "SET_GPS_DATA":
        case "BLUR_GPS":
        case "FETCHING_VENUES":
        case "INPUT_GPS":
        case "LOG_OUT":
            return initState
        default:
            return state
    }
}

// RIP THIS OUT