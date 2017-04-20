import { Reducer } from "redux"
import { openClose } from "../Interfaces"

export interface settingsPages {
    page: string;
}

export const settingsPages: Reducer<settingsPages> = (state: settingsPages = {
    page: "closed"
}, action) => {
    switch (action.type) {
        case "SHOW_SETTINGS_PAGE":
            switch (action.page) {
                case "preferences":
                case "account":
                case "places":
                case "location":
                case "favorites":
                    return { page: action.page }
                default:
                    return state;
            }
        case "CLOSE_SETTINGS_PAGE":
        case "OVERLAY_CLICKED":
        case "SHOW_FAVORITE":
        case "LOG_OUT":
            return { page: "closed" }
        default:
            return state;
    }
}

