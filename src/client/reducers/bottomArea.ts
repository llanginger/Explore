import { MasterAction } from "../Interfaces"

export interface bottomArea {
    show: boolean;
    big: boolean;
}

export const bottomArea = (state: bottomArea = {
    big: false,
    show: false
}, action: MasterAction) => {
    switch (action.type) {
        case "TOGGLE_BOTTOM_AREA":
            return { ...state, big: !state.big }
        case "FETCHED_VENUES":
        case "FETCHING_VENUES":
            return { ...state, show: false }
        case "LETS_GO":
            return { ...state, show: true }
        default:
            return state;
    }
}