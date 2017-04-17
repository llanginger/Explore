import { Reducer } from "redux"
export interface initState {
    showMainInputHelp: boolean;
    showOverlay: boolean;
    showThemeOptions: boolean;
}

const init: initState = {
    showMainInputHelp: true,
    showOverlay: true,
    showThemeOptions: false
}

export const initState: Reducer<initState> = (state: initState = init, action) => {
    switch (action.type) {
        case "DISMISS_MAIN_INPUT_HELP":
            return { ...state, showMainInputHelp: false }
        case "FETCHED_VENUES":
            return { ...state, showOverlay: false }
        case "TOGGLE_THEME_OPTIONS":
            return { ...state, showThemeOptions: !state.showThemeOptions }
        case "LOG_OUT":
            return { ...init }
        default:
            return state
    }
}