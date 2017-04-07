import { Reducer } from "redux"
export interface map {
    mapRef: google.maps.Map | string;
    directionsRenderer: google.maps.DirectionsRenderer | string;
    directionsService: google.maps.DirectionsService | string;
}

const initState: map = {
    mapRef: "",
    directionsRenderer: "",
    directionsService: ""
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