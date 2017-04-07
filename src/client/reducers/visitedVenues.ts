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
    userInfo: {
        dbInfo: {
            visitedVenues: visitedVenues
        }
    };
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
        case "LOG_IN":
            return {
                ...state,
                visitedIds: action.userInfo.dbInfo.visitedVenues.visitedIds,
                visitedVenues: action.userInfo.dbInfo.visitedVenues.visitedVenues
            }
        case "CLEAR_VISITED_VENUES":
            return { ...initState }
        default:
            return state
    }
}