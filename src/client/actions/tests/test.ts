import * as a from "../actions"
import { expect } from "chai"
import { Venue, VenueResponse } from "../../Interfaces"

interface SimpleAction {
    type: string
}

interface VenuePayload extends SimpleAction {
    payload: Venue;
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
        const expected = { type: "FETCHING_VENUES" }

        expect(result).to.deep.eq(expected)
    })

})

describe("FETCHED_VENUES", () => {
    const noData: VenueResponse = { queryInfo: {}, venues: [] }

    it("Should return FETCHED_VENUES with payload", () => {
        const result = a.FETCHED_VENUES(noData)
        expect(result).to.deep.eq({ type: "FETCHED_VENUES", payload: noData })
    })
})

describe("TOGGLE_BOTTOM_AREA", () => {
    it("Should return simple action", () => {
        const result = a.TOGGLE_BOTTOM_AREA()
        const expected: SimpleAction = { type: "TOGGLE_BOTTOM_AREA" }

        expect(result).to.deep.eq(expected)
    })
})

describe("NEXT_VENUE", () => {
    it("Should return simple action", () => {
        const result = a.NEXT_VENUE({})
        const expected: VenuePayload = { type: "NEXT_VENUE", payload: {} }

        expect(result).to.deep.eq(expected)
    })
})

describe("PREV_VENUE", () => {
    it("Should return simple action", () => {
        const result = a.PREV_VENUE({})
        const expected: VenuePayload = { type: "PREV_VENUE", payload: {} }

        expect(result).to.deep.eq(expected)
    })
})

describe("OPEN_MENU", () => {
    it("Should return simple action", () => {
        const result = a.OPEN_MENU()
        const expected: SimpleAction = { type: "OPEN_MENU" }

        expect(result).to.deep.eq(expected)
    })
})

describe("CLOSE_MENU", () => {
    it("Should return simple action", () => {
        const result = a.CLOSE_MENU()
        const expected: SimpleAction = { type: "CLOSE_MENU" }

        expect(result).to.deep.eq(expected)
    })
})

describe("FOCUS_INPUT", () => {
    it("Should return simple action", () => {
        const result = a.FOCUS_INPUT()
        const expected: SimpleAction = { type: "FOCUS_INPUT" }

        expect(result).to.deep.eq(expected)
    })
})

describe("CLEAR_VENUES", () => {
    it("Should return simple action", () => {
        const result = a.CLEAR_VENUES()
        const expected: SimpleAction = { type: "CLEAR_VENUES" }

        expect(result).to.deep.eq(expected)
    })
})

describe("CLOSE_SETTINGS_PAGE", () => {
    const result = a.CLOSE_SETTINGS_PAGE()
    const expected: SimpleAction = { type: "CLOSE_SETTINGS_PAGE" }
    it("Should return simple action", () => {

        expect(result).to.deep.eq(expected)
    })
})

describe("SHOW_SETTINGS_PAGE", () => {
    const result = a.SHOW_SETTINGS_PAGE("preferences")
    const expected: SHOW_SETTINGS_PAGE = { type: "SHOW_SETTINGS_PAGE", page: "preferences" }

    it("Should return settings page to show", () => {
        expect(result).to.deep.eq(expected)
    })
})

describe("VISITED_VENUE", () => {
    const result = a.VISITED_VENUE({}, "123")
    const expected: VISITED_VENUE = { type: "VISITED_VENUE", venue: {}, id: "123" }

    it("Should return venue + ID", () => {
        expect(result).to.deep.eq(expected)
    })
})

describe("LETS_GO", () => {
    const result = a.LETS_GO()
    const expected: SimpleAction = { type: "LETS_GO" }

    it("Should return simple action", () => {
        expect(result).to.deep.eq(expected)
    })
})

describe("DISMISS_MAIN_INPUT_HELP", () => {
    const result = a.DISMISS_MAIN_INPUT_HELP()
    const expected: SimpleAction = { type: "DISMISS_MAIN_INPUT_HELP" }

    it("Should return simple action", () => {
        expect(result).to.deep.eq(expected)
    })
})