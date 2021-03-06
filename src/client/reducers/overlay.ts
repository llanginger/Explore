import { Reducer } from "redux"
import { PAction } from "../Interfaces"

export interface overlay {
    showOverlay: boolean;
}

const initState: overlay = {
    showOverlay: false
}

export const overlay: Reducer<overlay> = (state: overlay = initState, action: PAction) => {
    switch (action.type) {
        case "OPEN_MENU":
        case "SHOW_SETTINGS_PAGE":
        case "BOTTOM_AREA_BIG":
        case "FOCUS_INPUT":
        case "INPUT_GPS":
            return { showOverlay: true }
        case "OVERLAY_CLICKED":
        case "CLOSE_SETTINGS_PAGE":
        case "BOTTOM_AREA_SMALL":
        case "SHOW_DIRECTIONS":
        case "BLUR_GPS":
        case "BLUR_INPUT":
        case "LETS_GO":
        case "SET_GPS_DATA":
        case "USE_GPS_POS":
        case "LOG_OUT":
        case "CLOSE_MENU":
        case "SHOW_FAVORITE":
            return { showOverlay: false }
        default:
            return state;
    }
}