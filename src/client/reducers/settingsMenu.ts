export interface settingsMenu {
    open: boolean;
}

export const settingsMenu = (state = { open: false}, action) => {
	switch (action.type) {
		case "OPEN_MENU":
			return { open: true };
		case "CLOSE_MENU":
			return { open: false };
		default:
			return state
	}
}