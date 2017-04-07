import { Reducer } from "redux"
export interface map {
    mapRef: google.maps.Map | string;
    directionRenderer: google.maps.DirectionsRenderer | string;
}

const initState: map = {
    mapRef: "",
    directionRenderer: ""
}
export const map: Reducer<map> = (state: map = initState, action) => {
    switch (action.type) {
        case "MAP_LOADED":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}