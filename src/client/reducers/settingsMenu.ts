export interface settingsMenu {
    open: boolean;
}

const initState: settingsMenu = {
    open: false
}

export const settingsMenu = (state: settingsMenu = initState, action) => {
    switch (action.type) {
        case "OPEN_MENU":
            return { open: true };
        case "CLOSE_MENU":
        case "LOG_OUT":
        case "SHOW_SETTINGS_PAGE":
            return { open: false };
        default:
            return state
    }
}