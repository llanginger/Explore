import { Reducer } from "redux"
import { PAction } from "../Interfaces"

export interface settingsMenu {
    open: boolean;
}

const initState: settingsMenu = {
    open: false
}

export const settingsMenu: Reducer<settingsMenu> = (state: settingsMenu = initState, action: PAction) => {
    switch (action.type) {
        case "OPEN_MENU":
            return { open: true };
        case "CLOSE_MENU":
        case "LOG_OUT":
        case "OVERLAY_CLICKED":
        case "SHOW_SETTINGS_PAGE":
            return { open: false };
        default:
            return state
    }
}