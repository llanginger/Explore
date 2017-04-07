import { Reducer } from "redux"

export interface userReducer {
    email?: string;
    userName?: string;
    profilePic: string;
    positionMarker?: any;
    hasGps: boolean;
    showDirections?: {
        start: {};
        end: {};
    }
}

const initState = {
    email: "",
    userName: "",
    profilePic: "https://pbs.twimg.com/profile_images/2192831080/cartoon-headshot.png",
    hasGps: false
}

export const userReducer: Reducer<userReducer> = (state: userReducer = initState, action) => {
    switch (action.type) {
        case "LOG_IN":
        case "UPDATE_PROFILE_INFO":
            return {
                ...state,
                ...action.userInfo
            }
        case "USER_MARKER_CREATED":
            return {
                ...state,
                ...action.userInfo,
                hasGps: true
            }
        case "MOVED_MARKER":
            return {
                ...state,
                positionMarker: action.marker
            }
        case "LOG_OUT":

            return { ...initState }
        default:
            return state;
    }
}