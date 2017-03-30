export interface homeInputState {
    active: boolean
}

const initState: homeInputState = {
    active: false
}

export const homeInputState = (state: homeInputState = initState, action) => {
    switch (action.type) {
        case "FOCUS_INPUT":
        case "CLEAR_VENUES":
            return { active: true }
        case "LETS_GO":
        case "LOG_OUT":
            return { active: false }
        default:
            return state
    }
}
