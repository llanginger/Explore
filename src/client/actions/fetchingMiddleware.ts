export const fetchingMiddleware = () => store => next => action => {
    const fetching = store.getState().fetchingVenues.fetching
    console.log("Fetching?: ", fetching);
    if (fetching === true) {
        console.log("Fetching is true")
        switch (action.type) {
            case "OVERLAY_CLICKED":
                return;
            default:
                return next(action)
        }
    } else {
        console.log("Fetching is false");
        return next(action)
    }
}