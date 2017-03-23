import { Venue } from "../Interfaces"

export interface currentResults {
    queryInfo: {};
    venues: Venue[]
}

const initState = {
    queryInfo: {},
    venues: []
}

export const currentResults = (state: currentResults = initState, action) => {
    switch (action.type) {
        case "VISITED_VENUE":
            const newState = state.venues.map((venue) => {
                if (venue.id === action.id) {
                    return { ...venue, visited: true }
                } else {
                    return venue
                }
            })

            return { ...state, venues: newState }
        case "FETCHED_VENUES":
            return {
                ...state,
                queryInfo: action.payload.queryInfo,
                venues: action.payload.venues
            }
        case "CLEAR_VENUES":
        case "FETCHING_VENUES":
            return initState
        default:
            return state
    }
}

// RIP THIS OUT