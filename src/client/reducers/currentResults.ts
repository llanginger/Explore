import { Venue, QueryInfo } from "../Interfaces"

export interface currentResults {
    queryInfo: {};
    venues: Venue[]
}

interface CRAction {
    type?: string;
    queryInfo?: QueryInfo;
    venues?: Venue[];
    venue?: Venue;
    id?: string;
}

const initState = {
    queryInfo: {},
    venues: []
}

export const currentResults = (state: currentResults = initState, action: CRAction) => {
    switch (action.type) {
        case "VISITED_VENUE":
            const newVisitedState = state.venues.map((venue) => {
                if (venue.id === action.id) {
                    return { ...venue, visited: true }
                } else {
                    return venue
                }
            })

            return { ...state, venues: newVisitedState }
        case "LETS_GO":
        case "NEXT_VENUE":
            const newSeenState = state.venues.map((venue) => {
                if (venue.id === action.venue.id) {
                    return { ...venue, seen: true }
                } else {
                    return venue
                }
            })

            return { ...state, venues: newSeenState }
        case "FETCHED_VENUES":
            return {
                ...state,
                queryInfo: action.queryInfo,
                venues: action.venues
            }
        case "CLEAR_VENUES":
        case "FETCHING_VENUES":
        case "LOG_OUT":
            return initState
        default:
            return state
    }
}

// RIP THIS OUT