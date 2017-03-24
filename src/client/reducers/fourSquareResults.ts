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

export const fourSquareResults = (state: fourSquareResults[] = [
    {
        queryInfo: {},
        venues: []
    }
], action: FSAction) => {
    switch (action.type) {
        case "FETCHING_VENUES":
            return state
        case "FETCHED_VENUES":
            return [...state, { queryInfo: action.queryInfo, venues: action.venues }]
        default:
            return state
    }
}


// results: Venue[];