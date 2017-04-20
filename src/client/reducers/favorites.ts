import { Venue } from "../Interfaces"

export interface favorites {
    favoriteVenues: {
        favoriteVenues: Venue[];
        favoriteIds: string[];
    }
}

const initState: favorites = {
    favoriteVenues: {
        favoriteVenues: [],
        favoriteIds: []
    }
}

export const favorites = (state: favorites = initState, action) => {
    switch (action.type) {
        case "ADD_TO_FAVORITES":
            return {
                ...state,
                favoriteVenues: {
                    favoriteVenues: [
                        ...state.favoriteVenues.favoriteVenues,
                        ...action.payload.venue
                    ],
                    favoriteIds: [
                        ...state.favoriteVenues.favoriteIds,
                        ...action.payload.venue.id
                    ],
                }
            }
        case "LOG_IN":
            return {
                ...state,
                favoriteVenues: {
                    favoriteVenues: action.userInfo.dbInfo.favoriteVenues.favoriteVenues,
                    favoriteIds: action.userInfo.dbInfo.favoriteVenues.favoriteIds
                }
            }
        default:
            return state;
    }
}