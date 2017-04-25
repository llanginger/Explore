import { Reducer, Action } from "redux"
import { Colors, PAction } from "../Interfaces"

export interface colors extends Colors { }

const initState: colors = {
    P_COLOR: "#607D8B",
    P_COLOR_DARK: "#455A64",
    P_COLOR_LIGHT: "#CFD8DC",
    ACCENT: "#536DFE",
    PRIMARY_TEXT: "#FFFFFF",
    MEDIUM_TEXT: "#757575",
    SECONDARY_TEXT: "#212121",
    ICONS: "#FFFFFF",
    DIVIDER: "#BDBDBD"
}


export const colors: Reducer<colors> = (state: colors = initState, action: PAction) => {
    switch (action.type) {
        case "COLOR_UPDATE":
            return { ...state, ...action.payload.color }
        default:
            return state;
    }
}