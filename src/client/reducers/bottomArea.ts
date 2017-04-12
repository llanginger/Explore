import { Reducer } from "redux"
import { MasterAction } from "../Interfaces"

export interface bottomArea {
    show: boolean;
    big: boolean;
}

const initState: bottomArea = {
    big: false,
    show: false
}
export const bottomArea: Reducer<bottomArea> = (state: bottomArea = initState, action: MasterAction) => {
    switch (action.type) {
        case "TOGGLE_BOTTOM_AREA":
            return { ...state, big: !state.big }
        case "SHOW_DIRECTIONS":
        case "BOTTOM_AREA_SMALL":
            return { ...state, big: false }
        case "BOTTOM_AREA_BIG":
            return { ...state, big: true }
        case "FETCHED_VENUES":
        case "FETCHING_VENUES":
            return { ...state, show: false }
        case "LETS_GO":
            return { ...state, show: true }
        case "LOG_OUT":
            return { ...initState }
        default:
            return state;
    }
}