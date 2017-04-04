import { Venue } from "../Interfaces"
const initState: Venue = {
    location: {},
    contact: {},
    name: "",
    id: "",
    photoSrc: [],
    reviews: [],
    rating: null,
    categories: []
}

interface cvAction {
    type?: string;
    venue?: Venue | {};
    mapRef?: any;
}

export const currentVenue = (state: Venue = initState, action: cvAction) => {
    switch (action.type) {
        case "PREV_VENUE":
        case "NEXT_VENUE":
        case "LETS_GO":
            // let currentVenue: Venue = { ...action.venue, seen: true }
            // currentVenue.marker.setMap(action.mapRef)
            // return { ...currentVenue }
            return { ...action.venue, seen: true }
        case "CLEAR_VENUES":
        case "LOG_OUT":
            return initState
        default:
            return state;
    }
}