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

export const visitedVenues = (state: visitedVenues = initState, action: VVAction) => {
    switch (action.type) {
        case "VISITED_VENUE":
            return {
                ...state,
                visitedIds: [...state.visitedIds, action.id],
                visitedVenues: [...state.visitedVenues, action.venue]
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