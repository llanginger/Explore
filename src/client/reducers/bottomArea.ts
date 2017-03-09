export interface bottomArea {
    show: boolean
}

export const bottomArea = (state = {
    show: false
}, action) => {
    switch(action.type) {
        case "TOGGLE_BOTTOM_AREA":
            return { show: !state.show }
        default:
            return state;
    }
}