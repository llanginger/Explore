import { Reducer } from "redux"
import { Venue, QueryInfo } from "../Interfaces"

export interface fourSquareResults {
    queryInfo: QueryInfo;
    venues: Venue[]
}

interface FSAction {
    type?: string;
    queryInfo?: QueryInfo;
    venues?: Venue[]
}

const initState: fourSquareResults = {
    queryInfo: {},
    venues: []
}

export const fourSquareResults: Reducer<fourSquareResults[]> = (state: fourSquareResults[] = [initState], action: FSAction) => {
    switch (action.type) {
        case "FETCHING_VENUES":
            return state
        case "FETCHED_VENUES":
            return [...state, { queryInfo: action.queryInfo, venues: action.venues }]
        case "LOG_OUT":
            return [{ ...initState }]
        default:
            return state
    }
}


// results: Venue[];