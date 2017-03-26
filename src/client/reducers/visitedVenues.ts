import { Venue } from "../Interfaces"

export interface visitedVenues {
    visitedIds: string[];
    visitedVenues: Venue[];
}

interface VVAction {
    type: string;
    id?: string;
    venue?: Venue;
}

export const visitedVenues = (state: visitedVenues = {
    visitedIds: [],
    visitedVenues: []
}, action: VVAction) => {
    switch (action.type) {
        case "VISITED_VENUE":
            return {
                ...state,
                visitedIds: [...state.visitedIds, action.id],
                visitedVenues: [...state.visitedVenues, action.venue]
            }
        default:
            return state
    }
}