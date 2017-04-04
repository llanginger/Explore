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
    oldVenue?: Venue;
    visitedVenues?: string[];
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
            const nextSeenState = state.venues.map((venue) => {
                if (venue.id === action.venue.id) {
                    return { ...venue, seen: true }
                } else {
                    return venue
                }
            })
            return { ...state, venues: nextSeenState }
        case "PREV_VENUE":
            const prevSeenState = state.venues.map((venue) => {
                if (venue.id === action.oldVenue.id) {
                    return { ...venue, seen: false }
                } else {
                    return venue
                }
            })
            return { ...state, venues: prevSeenState }
        case "FETCHED_VENUES":
            // -- Change this to filter against visited venues list and simply not populate currentvenues with any already-seen venues

            return {
                ...state,
                queryInfo: action.queryInfo,
                venues: action.venues.filter((venue) => {
                    return (action.visitedVenues.indexOf(venue.id) === -1)
                })
            }
        case "CLEAR_VENUES":
        case "FETCHING_VENUES":
        case "INPUT_GPS":
        case "LOG_OUT":
            return initState
        default:
            return state
    }
}

// RIP THIS OUT