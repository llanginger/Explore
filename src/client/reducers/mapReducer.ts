import { Reducer } from "redux"
import { PAction } from "../Interfaces"
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
export const map: Reducer<map> = (state: map = initState, action: PAction) => {
    switch (action.type) {
        case "MAP_LOADED":
            return {
                ...state,
                mapRef: action.payload.mapOpts.mapRef,
                directionsRenderer: action.payload.mapOpts.directionsRenderer,
                directionsService: action.payload.mapOpts.directionsService
            }
        default:
            return state;
    }
}