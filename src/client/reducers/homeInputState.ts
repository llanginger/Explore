export const homeInputState = (state = { active: false }, action) => {
	switch (action.type) {
		case "FOCUS_INPUT":
		case "CLEAR_VENUES":
			return {active: true}
		case "BLUR_INPUT":
			return { active: false }
		default: 
			return state
	}
}
