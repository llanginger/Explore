import { Venue, FourSquareResult } from "../Interfaces"



export interface fourSquareResults extends Array<FourSquareResult> {

}

export const fourSquareResults = (state: fourSquareResults = [
    {
        queryInfo: {},
        venues: []
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


// results: Venue[];