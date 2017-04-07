import { Reducer } from "redux"
export interface loggedIn {
    loggedIn: boolean;
    user: {
        email?: string;
        userName?: string;
        profilePic: string;
    }
}

const initState = {
    loggedIn: false,
    user: {
        email: "",
        userName: "",
        profilePic: "https://pbs.twimg.com/profile_images/2192831080/cartoon-headshot.png"
    }
}

export const loggedIn: Reducer<loggedIn> = (state: loggedIn = initState, action) => {
    switch (action.type) {
        case "LOG_IN":
            return {
                ...state,
                loggedIn: true,
                user: {
                    ...state.user,
                    ...action.userInfo.profileInfo
                }
            }
        case "LOG_OUT":
            return { ...initState }
        case "UPDATE_PROFILE_INFO":
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.userInfo
                }
            }
        default:
            return state
    }
}