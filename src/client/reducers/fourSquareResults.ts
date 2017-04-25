import { Reducer } from "redux"
import { Venue, QueryInfo, PAction } from "../Interfaces"

export interface fourSquareResults {
    queryInfo: QueryInfo;
    venues: Venue[]
}

const initState: fourSquareResults[] = [{
    queryInfo: {},
    venues: []
}]

export const fourSquareResults = (state: fourSquareResults[] = initState, action: PAction) => {
    switch (action.type) {
        case "FETCHING_VENUES":
            return state
        case "FETCHED_VENUES":
            return [...state, { queryInfo: action.payload.queryInfo, venues: action.payload.venues }]
        case "LOG_OUT":
            return [{ ...initState }]
        default:
            return state
    }
}


// results: Venue[];