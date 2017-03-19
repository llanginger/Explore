import { Venue } from "../Interfaces"

interface result {
    queryInfo: {};
    results: Venue[];
}

export interface fourSquareResults extends Array<result> {

}

export const fourSquareResults = (state: fourSquareResults = [
    {
        queryInfo: {},
        results: []
    }
], action) => {
    switch (action.type) {
        case "FETCHING_VENUES":
            return state
        case "FETCHED_VENUES":
            return [...state, action.payload]
        default:
            return state
    }
}