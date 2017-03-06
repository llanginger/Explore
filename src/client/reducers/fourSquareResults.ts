export const fourSquareResults = (state = [{ queryInfo: {}, results: [] }], action) => {
	switch (action.type) {
		case "FETCHING_VENUES":
			return state
		case "FETCHED_VENUES":
			return [...state, action.payload]
		default:
			return state
	}
}