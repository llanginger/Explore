import { Venue } from "../Interfaces"

export interface fourSquareResults {
	queryInfo: any;
	results: Venue[];
}

export const fourSquareResults = (state: fourSquareResults[] = [
	{ 
		queryInfo: {}, 
		results: [] 
	}
], action) => {
	switch (action.type) {
		case "FETCHING_VENUES":
			return state
		case "FETCHED_VENUES":
			return [...state, action.payload]
		default:
			return state
	}
}