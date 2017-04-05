import { Reducer } from "redux"
export interface markers {
    mapRef: any;
}

const initState: markers = {
    mapRef: ""
}
export const markers: Reducer<markers> = (state: markers = initState, action) => {
    switch (action.type) {
        case "MAP_LOADED":
            return { ...state, mapRef: action.mapRef }
        default:
            return state;
    }
}