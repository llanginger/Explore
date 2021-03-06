import { Reducer } from "redux"
import { Venue, PAction } from "../Interfaces"

export interface currentVenue extends Venue { }
const initState: currentVenue = {
    location: {},
    contact: {},
    name: "",
    id: "",
    photoSrc: [],
    reviews: [],
    rating: null,
    categories: [],
    marker: undefined
}

export const currentVenue: Reducer<currentVenue> = (state: currentVenue = initState, action: PAction) => {
    switch (action.type) {
        case "PREV_VENUE":
        case "NEXT_VENUE":
        case "LETS_GO":
        case "SHOW_FAVORITE":
            // let currentVenue: Venue = { ...action.venue, seen: true }
            // currentVenue.marker.setMap(action.mapRef)
            // return { ...currentVenue }
            return { ...action.payload.venue, seen: true }
        case "CLEAR_VENUES":
        case "SET_GPS_DATA":
        case "INPUT_GPS":
        case "BLUR_GPS":
        case "LOG_OUT":
        case "CLEAR_VENUES":
            return initState
        case "FOCUS_USER_INPUT":
            return state;
        default:
            return state;
    }
}