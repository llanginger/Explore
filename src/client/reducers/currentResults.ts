import { Venue } from "../Interfaces"

export interface currentResults {
	queryInfo: {};
	results: Venue[]
}

export const currentResults = (state: currentResults = { 
	queryInfo: {}, results: [] 
}, action) => 
{
	switch (action.type) {
		case "VISITED_VENUE":
			const newState = state.results.map((venue) => {
				if (venue.id === action.id) {
					return {...venue, visited: true}
				} else {
					return venue
				}
			})

			return {...state, results: newState}
		case "FETCHED_VENUES":
			return action.payload
		case "FETCHING_VENUES":
			return {
				queryInfo: {},
				results: []
			}
		case "CLEAR_VENUES":
			return { queryInfo: {}, results: [] }
		default:
			return state
	}
}