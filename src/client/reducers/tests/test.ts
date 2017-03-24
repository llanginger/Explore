import { expect } from "chai"
import { Venue, FourSquareResult, VenueResponse } from "../../Interfaces"
import * as r from "../reducers"
import * as a from "../../actions/actions"

const dummyVenueOne: Venue = {
    location: {},
    contact: {},
    name: "House of Pancakes",
    id: "123",
    photoSrc: [],
    reviews: [],
    rating: null,
    categories: [],
    seen: true,
    visited: true
}

const dummyVenueTwo: Venue = {
    location: {},
    contact: {},
    name: "Starbucks",
    id: "234",
    photoSrc: [],
    reviews: [],
    rating: null,
    categories: [],
    seen: false,
    visited: true
}

describe("Spinner", () => {
    const initState = false
    it("should return false", () => {
        const result = r.spinner(initState, {});
        expect(result).to.deep.equal(false)
    })

    it("should return true", () => {
        const result = r.spinner(initState, a.FETCHING_VENUES());
        expect(result).to.deep.equal(true)
    })
})

describe("Current Venue", () => {
    const initState: Venue = {
        location: {},
        contact: {},
        name: "",
        id: "",
        photoSrc: [],
        reviews: [],
        rating: null,
        categories: []
    }
    const newState: Venue = {
        ...initState,
        name: "New Venue 1",
        id: "12345"
    }

    it("Should return empty", () => {
        const result = r.currentVenue(initState, {})
        expect(result).to.deep.eq(initState)
    })

    it("Should return new state on NEXT_VENUE", () => {

        const result = r.currentVenue(initState, {
            type: "NEXT_VENUE",
            payload: newState
        })
        expect(result).to.deep.eq({ ...newState, seen: true })
    })

    it("Should return new state on PREV_VENUE", () => {

        const result = r.currentVenue(initState, {
            type: "PREV_VENUE",
            payload: newState
        })
        expect(result).to.deep.eq({ ...newState, seen: true })
    })

    it("Should return empty on Clear venues call", () => {
        const result = r.currentVenue(newState, {
            type: "CLEAR_VENUES"
        })
        expect(result).to.deep.eq(initState)
    })

})

describe("Settings Menu", () => {
    const initState = { open: false }
    const openState = { open: true }

    it("Should return default (false)", () => {
        const result = r.settingsMenu(initState, {})
        expect(result).to.deep.eq(initState)
    })

    it("Should return true", () => {
        const result = r.settingsMenu(initState, { type: "OPEN_MENU" })
        expect(result).to.deep.eq(openState)
    })

    it("Should return false", () => {
        const result = r.settingsMenu(openState, { type: "CLOSE_MENU" })
        expect(result).to.deep.eq(initState)
    })
})

describe("Settings Pages", () => {
    const initState = {
        preferences: { open: false },
        account: { open: false },
        previousVenues: { open: false }
    }

    const prefsOpen = {
        ...initState,
        preferences: { open: true }
    }

    it("Should return all closed (default)", () => {
        const result = r.settingsPages(initState, {})
        expect(result).to.deep.eq(initState)
    })

    it("Should return prefs open", () => {
        const result = r.settingsPages(initState, {
            type: "SHOW_SETTINGS_PAGE",
            page: "preferences"
        })
        expect(result).to.deep.eq(prefsOpen)
    })

    it("Should return default if wrong name", () => {
        const result = r.settingsPages(initState, {
            type: "SHOW_SETTINGS_PAGE",
            page: "gobbledegook"
        })
        expect(result).to.deep.eq(initState)
    })
})

describe("Init State", () => {

    const s = {
        initState: {
            showMainInputHelp: true,
            showOverlay: true
        },
        mainInputFalse: {
            showMainInputHelp: false,
            showOverlay: true
        },
        overlayFalse: {
            showMainInputHelp: true,
            showOverlay: false
        }
    }
    it("Should return all true (default)", () => {
        const result = r.initState(s.initState, {})
        expect(result).to.deep.eq(s.initState)
    })

    it("Should return Main Input false", () => {
        const result = r.initState(s.initState, { type: "DISMISS_MAIN_INPUT_HELP" })
        expect(result).to.deep.eq(s.mainInputFalse)
    })

    it("Should return Main Input false", () => {
        const result = r.initState(s.initState, { type: "FETCHED_VENUES" })
        expect(result).to.deep.eq(s.overlayFalse)
    })
})

describe("FourSquare Results", () => {
    const initState: r.fourSquareResults = [{ queryInfo: {}, venues: [] }]
    const dummyState: r.fourSquareResults = [{ queryInfo: {}, venues: [dummyVenueOne] }]
    const fetchingValuesState: r.fourSquareResults = [...initState]

    it("Should return initState on default", () => {
        const result = r.fourSquareResults(initState, {})
        expect(result).to.deep.eq(initState)
    })

    it("Should return initState on fetching venues", () => {
        const result = r.fourSquareResults(initState, { type: "FETCHING_VENUES" })
        expect(result).to.deep.eq(fetchingValuesState)
    })

    it("Should return new venue", () => {
        const dummyPayloadOne: FourSquareResult = {
            queryInfo: {},
            venues: [dummyVenueOne]
        }
        const result = r.fourSquareResults(initState, {
            type: "FETCHED_VENUES",
            payload: dummyPayloadOne
        })
        expect(result).to.deep.eq([...initState, dummyPayloadOne])
    })
})

describe("Current Results", () => {

    interface CRAction {
        type?: string;
        payload?: VenueResponse
    }

    const initState: VenueResponse = {
        queryInfo: {},
        venues: []
    }

    const dummyState = {
        queryInfo: {},
        venues: [
            dummyVenueOne
        ]
    }

    it("Should return empty", () => {
        const result = r.currentResults(initState, {})
        expect(result).to.deep.eq(initState)
    })

    it("should return empty after fetching values called", () => {
        const result = r.currentResults(dummyState, { type: "FETCHING_VENUES" })
        expect(result).to.deep.eq(initState)
    })

    it("Should return venues", () => {
        const action: CRAction = {
            type: "FETCHED_VENUES",
            payload: {
                queryInfo: {},
                venues: [
                    dummyVenueOne
                ]
            }
        }
        const stateAfter: VenueResponse = {
            queryInfo: {},
            venues: [
                dummyVenueOne
            ]
        }
        const result = r.currentResults(initState, action)

        expect(result).to.deep.eq(stateAfter)
    })
})