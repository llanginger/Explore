import { Reducer } from "redux"
import { PAction } from "../Interfaces"
export interface homeInputState {
    active: boolean;
    isInGPSMode: boolean
}

const initState: homeInputState = {
    active: false,
    isInGPSMode: false,
}

export const homeInputState: Reducer<homeInputState> = (state: homeInputState = initState, action: PAction) => {
    switch (action.type) {
        case "FOCUS_INPUT":
        case "CLEAR_VENUES":
            return { ...state, active: true }
        case "LETS_GO":
        case "BLUR_INPUT":
        case "BLUR_GPS":
        case "SET_GPS_DATA":
        case "LOG_OUT":
        case "FOCUS_USER_MARKER":
        case "USE_GPS_POS":
        case "OVERLAY_CLICKED":
            return { ...state, active: false, isInGPSMode: false }
        case "INPUT_GPS":
            return { ...state, active: true, isInGPSMode: true }

        default:
            return state
    }
}
