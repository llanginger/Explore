import { Reducer } from "redux"
import { Venue } from "../Interfaces"

export interface visitedVenues {
    visitedIds: string[];
    visitedVenues: Venue[];
}

interface VVAction {
    type: string;
    id?: string;
    venue?: Venue;
    fireVenues?: visitedVenues;
}

const initState = {
    visitedIds: [],
    visitedVenues: []
}

export const visitedVenues: Reducer<visitedVenues> = (state: visitedVenues = initState, action: VVAction) => {
    switch (action.type) {
        case "VISITED_VENUE":
            const formattedVenue: Venue = {
                ...action.venue,
                marker: {}
            }
            return {
                ...state,
                visitedIds: [...state.visitedIds, action.id],
                visitedVenues: [...state.visitedVenues, formattedVenue]
            }
        case "FIREBASE_VENUES":
            return {
                ...state,
                visitedIds: action.fireVenues.visitedIds,
                visitedVenues: action.fireVenues.visitedVenues
            }
        case "CLEAR_VISITED_VENUES":
            return { ...initState }
        default:
            return state
    }
}