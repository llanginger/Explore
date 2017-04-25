import { Reducer } from "redux"
import { PAction, ProfileInfo } from "../Interfaces"

export interface userReducer extends ProfileInfo { }

const initState: userReducer = {
    email: "",
    userName: "",
    profilePic: "https://pbs.twimg.com/profile_images/2192831080/cartoon-headshot.png",
    hasGps: false
}

export const userReducer: Reducer<userReducer> = (state: userReducer = initState, action: PAction) => {
    switch (action.type) {
        case "LOG_IN":
        case "UPDATE_PROFILE_INFO":
            return {
                ...state,
                ...action.payload.profileInfo
            }
        case "UPDATE_PROFILE_PIC":
            return {
                ...state,
                profilePic: action.payload.profileInfo.profilePic
            }
        case "USER_MARKER_CREATED":
            return {
                ...state,
                positionMarker: action.payload.profileInfo.positionMarker, // Change this to marker or userMArker
                hasGps: true
            }
        case "MOVED_MARKER":
            return {
                ...state,
                positionMarker: action.payload.marker
            }
        case "NO_GPS_AVAILABLE":
            return {
                ...state,
                hasGps: false
            }
        case "LOG_OUT":

            return { ...initState }
        default:
            return state;
    }
}