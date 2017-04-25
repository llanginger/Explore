import { Venue, PAction } from "../Interfaces"


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

export const favorites = (state: favorites = initState, action: PAction) => {
    switch (action.type) {
        case "ADD_TO_FAVORITES":
            return {
                ...state,
                favoriteVenues: {
                    favoriteVenues: [
                        ...state.favoriteVenues.favoriteVenues,
                        action.payload.venue
                    ],
                    favoriteIds: [
                        ...state.favoriteVenues.favoriteIds,
                        action.payload.venue.id
                    ],
                }
            }
        case "REMOVE_FROM_FAVORITES":

            const favVenues = state.favoriteVenues.favoriteVenues.filter((venue) => { return venue.id !== action.payload.venue.id })
            const favIds = state.favoriteVenues.favoriteIds.filter((id) => { return id !== action.payload.venue.id })

            const newState = {
                ...state,
                favoriteVenues: {
                    favoriteVenues: favVenues,
                    favoriteIds: favIds
                }
            }

            return newState


        case "LOG_IN":
            return {
                ...state,
                favoriteVenues: {
                    favoriteVenues: action.payload.dbInfo.favoriteVenues.favoriteVenues,
                    favoriteIds: action.payload.dbInfo.favoriteVenues.favoriteIds
                }
            }
        case "CLEAR_FAVORITES":
            return { ...initState }
        default:
            return state;
    }
}