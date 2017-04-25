import { Reducer } from "redux"
import { User, PAction } from "../Interfaces"
export interface loggedIn {
    loggedIn: boolean;
    user: User
}

const initState = {
    loggedIn: false,
    user: {
        email: "",
        userName: "",
        profilePic: "https://pbs.twimg.com/profile_images/2192831080/cartoon-headshot.png"
    }
}

export const loggedIn: Reducer<loggedIn> = (state: loggedIn = initState, action: PAction) => {
    switch (action.type) {
        case "LOG_IN":
            return {
                ...state,
                loggedIn: true,
                user: {
                    ...state.user,
                    ...action.payload.profileInfo
                }
            }
        case "LOG_OUT":
            return { ...initState }
        case "UPDATE_PROFILE_INFO":
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload.profileInfo
                }
            }
        default:
            return state
    }
}