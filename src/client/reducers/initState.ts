export interface initState {
	showMainInputHelp: boolean;
}

export const initState = (state: initState = {
	showMainInputHelp: true
}, action) => {
	switch (action.type) {
		case "DISMISS_MAIN_INPUT_HELP":
			return {...state, showMainInputHelp: false}
		default:
			return state
	}
}