export interface openClose {
    open: boolean
}

export interface settingsPages {
    preferences: openClose;
    account: openClose;
    previousVenues: openClose;
}

export const settingsPages = (state: settingsPages = {
    preferences: { open: false },
    account: { open: false },
    previousVenues: { open: false } 
}, action) => {
    const togglePage = (pageName: string) => {
        let newState: settingsPages = {...state}
        for (const page in newState) {
            if (page === pageName.toLowerCase()) {
                newState[page].open = true
            } else {
                newState[page].open = false
            }
        }
        return newState
    }
    switch (action.type) {
        case "SHOW_SETTINGS_PAGE":
            return togglePage(action.page)
        case "CLOSE_SETTINGS_PAGE":
            return togglePage("close")
        default:
            return state;
    }
}

