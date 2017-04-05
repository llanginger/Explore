import { Reducer } from "redux"


export const spinner: Reducer<Boolean> = (state: Boolean = false, action) => {
    switch (action.type) {
        case "FETCHING_VENUES":
            return true;
        case "FETCHED_VENUES":
            return false;
        default:
            return state
    }
}