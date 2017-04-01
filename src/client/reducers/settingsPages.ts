import { openClose } from "../Interfaces"

export interface settingsPages {
    page: string;
}

export const settingsPages = (state: settingsPages = {
    page: "closed"
}, action) => {
    switch (action.type) {
        case "SHOW_SETTINGS_PAGE":
            switch (action.page) {
                case "preferences":
                case "account":
                case "places":
                case "location":
                    return { page: action.page }
                default:
                    return state;
            }
        case "CLOSE_SETTINGS_PAGE":
        case "LOG_OUT":
            return { page: "closed" }
        default:
            return state;
    }
}

