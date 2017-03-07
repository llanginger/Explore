
export const settingsMenu = (state: string = "CLOSE_MENU", action) => {
	switch (action.type) {
		case "OPEN_MENU":
			return action.type;
		case "CLOSE_MENU":
			return action.type;
		default:
			return state
	}
}