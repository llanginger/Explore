
export const spinner = (state: Boolean = false, action) => {
    switch(action.type) {
        case "FETCHING_VENUES":
            return true;
        case "FETCHED_VENUES":
            return false;
        default:
            return state
    }
}