export const spinner = (state = false, action) => {
    switch(action.type) {
        case "FETCHING_VENUES":
            return true;
        case "FETCHED_VENUES":
            return false;
        default:
            return state
    }
}