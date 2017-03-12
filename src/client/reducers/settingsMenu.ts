export interface settingsMenu {
    open: boolean;
}

export const settingsMenu = (state: settingsMenu = { 
    open: false
}, action) => {
	switch (action.type) {
		case "OPEN_MENU":
			return { open: true };
		case "CLOSE_MENU":
        case "SHOW_SETTINGS_PAGE":
			return { open: false };
		default:
			return state
	}
}