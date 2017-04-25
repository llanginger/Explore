import { Reducer } from "redux"
import { Venue, PAction } from "../Interfaces"

export interface visitedVenues {
    visitedIds: string[];
    visitedVenues: Venue[];
}


const initState = {
    visitedIds: [],
    visitedVenues: []
}

export const visitedVenues: Reducer<visitedVenues> = (state: visitedVenues = initState, action: PAction) => {
    switch (action.type) {
        case "VISITED_VENUE":
            const formattedVenue: Venue = {
                ...action.payload.venue,
                marker: {}
            }
            return {
                ...state,
                visitedIds: [...state.visitedIds, action.payload.id],
                visitedVenues: [...state.visitedVenues, formattedVenue]
            }
        case "LOG_IN":
            return {
                ...state,
                visitedIds: action.payload.dbInfo.visitedVenues.visitedIds,
                visitedVenues: action.payload.dbInfo.visitedVenues.visitedVenues
            }
        case "CLEAR_VISITED_VENUES":
            return { ...initState }
        default:
            return state
    }
}