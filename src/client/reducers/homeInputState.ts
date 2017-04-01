export interface homeInputState {
    active: boolean;
    isInGPSMode: boolean
}

const initState: homeInputState = {
    active: false,
    isInGPSMode: false,
}

export const homeInputState = (state: homeInputState = initState, action) => {
    switch (action.type) {
        case "FOCUS_INPUT":
        case "CLEAR_VENUES":
            return { ...state, active: true }
        case "LETS_GO":
        case "BLUR_INPUT":
        case "SET_GPS_DATA":
        case "LOG_OUT":
            return { ...state, active: false, isInGPSMode: false }
        case "INPUT_GPS":
            return { ...state, active: true, isInGPSMode: true }

        default:
            return state
    }
}
