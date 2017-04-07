import { Reducer } from "redux"
import { Venue } from "../Interfaces"

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

interface cvAction {
    type?: string;
    venue?: Venue | {};
    mapRef?: any;
}

export const currentVenue: Reducer<currentVenue> = (state: currentVenue = initState, action: cvAction) => {
    switch (action.type) {
        case "PREV_VENUE":
        case "NEXT_VENUE":
        case "LETS_GO":
            // let currentVenue: Venue = { ...action.venue, seen: true }
            // currentVenue.marker.setMap(action.mapRef)
            // return { ...currentVenue }
            return { ...action.venue, seen: true }
        case "CLEAR_VENUES":
        case "SET_GPS_DATA":
        case "INPUT_GPS":
        case "BLUR_GPS":
        case "LOG_OUT":
            return initState
        case "FOCUS_USER_INPUT":
            return state;
        default:
            return state;
    }
}