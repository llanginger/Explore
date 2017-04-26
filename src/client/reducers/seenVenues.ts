import { Reducer } from "redux"
import { PAction } from "../Interfaces"
export interface seenVenues extends Array<string> {
}

export const seenVenues: Reducer<seenVenues> = (state: seenVenues = [], action: PAction) => {
    switch (action.type) {
        case "NEXT_VENUE":
            return [...state, action.payload.venue.id]
        case "LOG_OUT":
            return []
        default:
            return state
    }
}