import { Reducer } from "redux"

export interface spinner {
    searchResultsSpinner: boolean;
    imageUploadSpinner: boolean
}

const initState: spinner = {
    searchResultsSpinner: false,
    imageUploadSpinner: false
}

export const spinner: Reducer<spinner> = (state: spinner = initState, action) => {
    switch (action.type) {
        case "FETCHING_VENUES":
            return {
                ...state,
                searchResultsSpinner: true
            };
        case "FETCHED_VENUES":
            return {
                ...state,
                searchResultsSpinner: false
            };
        case "UPLOADING_IMAGE":
            return {
                ...state,
                imageUploadSpinner: true
            };
        case "UPDATE_PROFILE_PIC":
            return {
                ...state,
                imageUploadSpinner: false
            };
        default:
            return state
    }
}