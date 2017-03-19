export interface initState {
    showMainInputHelp: boolean;
    showOverlay: boolean
}

export const initState = (state: initState = {
    showMainInputHelp: true,
    showOverlay: true
}, action) => {
    switch (action.type) {
        case "DISMISS_MAIN_INPUT_HELP":
            return { ...state, showMainInputHelp: false }
        case "FETCHED_VENUES":
            return { ...state, showOverlay: false }
        default:
            return state
    }
}