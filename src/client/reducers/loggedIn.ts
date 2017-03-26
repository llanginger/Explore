export interface loggedIn {
    loggedIn: boolean;
    user: { name?: string, id?: string }
}

const initState = {
    loggedIn: false,
    user: {}
}

export const loggedIn = (state: loggedIn = initState, action) => {
    switch (action.type) {
        case "LOG_IN":
            return { ...state, loggedIn: true, user: action.user }
        case "LOG_OUT":
            return { ...initState }
        default:
            return state
    }
}