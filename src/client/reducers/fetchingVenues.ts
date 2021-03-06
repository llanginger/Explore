import { Reducer } from "redux"
import { PAction } from "../Interfaces"

export interface fetchingVenues {
    fetching: boolean;
}

const initState: fetchingVenues = {
    fetching: false
}

export const fetchingVenues: Reducer<fetchingVenues> = (state: fetchingVenues = initState, action: PAction) => {
    switch (action.type) {
        case "FETCHING_VENUES":
            return { fetching: true }
        case "FETCHED_VENUES":
            return { fetching: false }
        default:
            return state;
    }
}