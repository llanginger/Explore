import { Venue } from "../Interfaces"
const initState: Venue = {
    location: {
        lat: 47.625058,
        lng: -122.337680
    },
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
}

export const currentVenue = (state: Venue = initState, action: cvAction) => {
    switch (action.type) {
        case "PREV_VENUE":
        case "NEXT_VENUE":
        case "LETS_GO":
            return { ...action.venue, seen: true }
        case "CLEAR_VENUES":
            return initState
        default:
            return state;
    }
}