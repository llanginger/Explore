import * as a from "../actions"
import { expect } from "chai"
import { Venue, User, PAction } from "../../Interfaces"

interface SimpleAction {
    type: string
}

interface VenuePayload extends SimpleAction {
    venue: Venue;
}

interface OldVenuePayload extends VenuePayload {
    oldVenue: Venue;
}

interface UserPayload extends SimpleAction {
    user: User;
}

interface SHOW_SETTINGS_PAGE extends SimpleAction {
    page: string
}

// TODO This needs refactoring. ID isn't needed and there shouldn't be both "venue" and "payload" for the same kind of action payloads
interface VISITED_VENUE extends SimpleAction {
    venue: Venue
    id: string;
}


describe("Fetching Venues", () => {
    it("Should return simple action", () => {
        const result = a.FETCHING_VENUES()
        const expected: PAction = { type: "FETCHING_VENUES" }

        expect(result).to.deep.eq(expected)
    })

})

describe("FETCHED_VENUES", () => {
    const noData = { venues: [], visitedVenues: [], queryInfo: {} }

    it("Should return FETCHED_VENUES with payload", () => {
        const result: PAction = a.FETCHED_VENUES([], [], {})
        expect(result).to.deep.eq({
            type: "FETCHED_VENUES",
            payload: {
                venues: noData.venues,
                visitedVenues: noData.visitedVenues,
                queryInfo: noData.queryInfo
            }
        })
    })
})

describe("TOGGLE_BOTTOM_AREA", () => {
    it("Should return simple action", () => {
        const result: PAction = a.TOGGLE_BOTTOM_AREA()
        const expected: PAction = { type: "TOGGLE_BOTTOM_AREA" }

        expect(result).to.deep.eq(expected)
    })
})

describe("NEXT_VENUE", () => {
    it("Should return simple action", () => {
        const result = a.NEXT_VENUE({})
        const expected: PAction = {
            type: "NEXT_VENUE",
            payload: {
                venue: {}
            }
        }

        expect(result).to.deep.eq(expected)
    })
})

describe("PREV_VENUE", () => {
    it("Should return simple action", () => {
        const result = a.PREV_VENUE({}, {})
        const expected: PAction = {
            type: "PREV_VENUE",
            payload: {
                venue: {},
                oldVenue: {}
            }
        }

        expect(result).to.deep.eq(expected)
    })
})

describe("OPEN_MENU", () => {
    it("Should return simple action", () => {
        const result = a.OPEN_MENU()
        const expected: PAction = { type: "OPEN_MENU" }

        expect(result).to.deep.eq(expected)
    })
})

describe("CLOSE_MENU", () => {
    it("Should return simple action", () => {
        const result = a.CLOSE_MENU()
        const expected: PAction = { type: "CLOSE_MENU" }

        expect(result).to.deep.eq(expected)
    })
})

describe("FOCUS_INPUT", () => {
    it("Should return simple action", () => {
        const result = a.FOCUS_INPUT()
        const expected: PAction = { type: "FOCUS_INPUT" }

        expect(result).to.deep.eq(expected)
    })
})

describe("CLEAR_VENUES", () => {
    it("Should return simple action", () => {
        const result = a.CLEAR_VENUES()
        const expected: PAction = { type: "CLEAR_VENUES" }

        expect(result).to.deep.eq(expected)
    })
})

describe("CLOSE_SETTINGS_PAGE", () => {
    const result = a.CLOSE_SETTINGS_PAGE()
    const expected: PAction = { type: "CLOSE_SETTINGS_PAGE" }
    it("Should return simple action", () => {

        expect(result).to.deep.eq(expected)
    })
})

describe("SHOW_SETTINGS_PAGE", () => {
    const result = a.SHOW_SETTINGS_PAGE("preferences")
    const expected: PAction = {
        type: "SHOW_SETTINGS_PAGE",
        payload: {
            page: "preferences"
        }
    }

    it("Should return settings page to show", () => {
        expect(result).to.deep.eq(expected)
    })
})

describe("VISITED_VENUE", () => {
    const result = a.VISITED_VENUE({}, "123")
    const expected: PAction = {
        type: "VISITED_VENUE",
        payload: {
            venue: {},
            id: "123"
        }
    }

    it("Should return venue + ID", () => {
        expect(result).to.deep.eq(expected)
    })
})

describe("LETS_GO", () => {
    const result = a.LETS_GO({})
    const expected: PAction = {
        type: "LETS_GO",
        payload: {
            venue: {}
        }
    }

    it("Should return empty venue", () => {
        expect(result).to.deep.eq(expected)
    })
})

describe("DISMISS_MAIN_INPUT_HELP", () => {
    const result = a.DISMISS_MAIN_INPUT_HELP()
    const expected: PAction = { type: "DISMISS_MAIN_INPUT_HELP" }

    it("Should return simple action", () => {
        expect(result).to.deep.eq(expected)
    })
})

describe("LOG_IN", () => {
    const newUser: User = { email: "Leo@leo.com", userName: "Leo", profilePic: "www.123.com" }
    const result = a.LOG_IN(newUser, {})
    const expected: PAction = {
        type: "LOG_IN",
        payload: {
            profileInfo: newUser,
            dbInfo: {}
        }
    }
    it("should return LogIn action", () => {

        expect(result).to.deep.eq(expected)
    })
})

describe("LOG_OUT", () => {
    const result = a.LOG_OUT()
    const expected: PAction = { type: "LOG_OUT" }
    it("should return simple action", () => {

        expect(result).to.deep.eq(expected)
    })
})