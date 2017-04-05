import { Reducer } from "redux"
export interface seenVenues extends Array<string> {
}

export const seenVenues: Reducer<seenVenues> = (state: seenVenues = [], action) => {
    switch (action.type) {
        case "NEXT_VENUE":
            return [...state, action.id]
        case "LOG_OUT":
            return []
        default:
            return state
    }
}