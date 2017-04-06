import { Reducer } from "redux"
export interface map {
    mapRef: any;
}

const initState: map = {
    mapRef: ""
}
export const map: Reducer<map> = (state: map = initState, action) => {
    switch (action.type) {
        case "MAP_LOADED":
            return { ...state, mapRef: action.mapRef }
        default:
            return state;
    }
}