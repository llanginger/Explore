import { Reducer, Action } from "redux"
import { Colors } from "../Interfaces"

export interface colors extends Colors { }

const initState: colors = {
    P_COLOR_DARK: "#FFFFFF",
    P_COLOR: "#FFFFFF",
    P_COLOR_LIGHT: "#FFFFFF",
    ACCENT: "#FFFFFF",
    PRIMARY_TEXT: "#FFFFFF",
    SECONDARY_TEXT: "#FFFFFF",
    ICONS: "#FFFFFF",
    DIVIDER: "#FFFFFF"
}


export const colors: Reducer<colors> = (state: colors = initState, action) => {
    switch (action.type) {
        case "COLOR_UPDATE":
            return { ...state, ...action.payload.color }
        default:
            return state;
    }
}