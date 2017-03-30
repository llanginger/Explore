import { expect } from "chai"
import { Venue, VenueResponse, QueryInfo, User } from "../../Interfaces"
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

// --- LoggedIn --- //

describe("LoggedIn", () => {
    const initState: r.loggedIn = {
        loggedIn: false,
        user: {}
    }

    const newUser: User = {
        email: "llanginger@gmail.com"
    }

    const newState = { ...initState, loggedIn: true, user: newUser }

    it("Should return false on default", () => {
        const result = r.loggedIn(initState, {})
        expect(result).to.deep.eq(initState)
    })

    it("Should return logged-in user on log in", () => {

        const result = r.loggedIn(initState, a.LOG_IN(newUser))
        expect(result).to.deep.eq(newState)
    })

    it("Should return logged out on Log Out", () => {
        const result = r.loggedIn(newState, a.LOG_OUT())
        expect(result).to.deep.eq(initState)
    })

})

// --- Spinner --- //

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

// --- Current Venue --- //

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
            venue: newState
        })
        expect(result).to.deep.eq({ ...newState, seen: true })
    })

    it("Should return new state on LETS_GO", () => {

        const result = r.currentVenue(initState, {
            type: "LETS_GO",
            venue: newState
        })
        expect(result).to.deep.eq({ ...newState, seen: true })
    })

    // it("Should return previous venue on PREV_VENUE", () => {

    //     const result = r.currentVenue({ ...dummyVenueTwo, seen: true }, {
    //         type: "PREV_VENUE"
    //     })
    //     expect(result).to.deep.eq({ ...dummyVenueOne, seen: true })
    // })

    it("Should return empty on Clear venues call", () => {
        const result = r.currentVenue(newState, {
            type: "CLEAR_VENUES"
        })
        expect(result).to.deep.eq(initState)
    })

})

// --- Seen Venues -- //

describe("SeenVenues", () => {
    it("should return empty on default", () => {
        const result: r.seenVenues = r.seenVenues([], {})

        expect(result).to.deep.eq([])
    })

    it("should return 1 id", () => {
        const newAction = {
            type: "NEXT_VENUE",
            id: "123"
        }
        const result: r.seenVenues = r.seenVenues([], newAction)
        const stateAfter: r.seenVenues = ["123"]

        expect(result).to.deep.eq(stateAfter)
    })

    it("should return 2 ids", () => {
        const initState = ["123"]
        const newAction = {
            type: "NEXT_VENUE",
            id: "234"
        }
        const result: r.seenVenues = r.seenVenues(initState, newAction)
        const stateAfter: r.seenVenues = ["123", "234"]

        expect(result).to.deep.eq(stateAfter)
    })
})

// --- Settings Menu--- //

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

// --- Settings Pages --- //

describe("Settings Pages", () => {
    const initState = {
        page: "closed"
    }

    const prefsOpen = {
        page: "preferences"
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

// --- Init State --- //

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

// --- Foursquare Results --- //

describe("FourSquare Results", () => {
    const initState: VenueResponse[] = [{ queryInfo: {}, venues: [] }]
    const dummyState: VenueResponse[] = [{ queryInfo: {}, venues: [dummyVenueOne] }]
    const fetchingValuesState: VenueResponse[] = [...initState]

    it("Should return initState on default", () => {
        const result = r.fourSquareResults(initState, {})
        expect(result).to.deep.eq(initState)
    })

    it("Should return initState on fetching venues", () => {
        const result = r.fourSquareResults(initState, { type: "FETCHING_VENUES" })
        expect(result).to.deep.eq(fetchingValuesState)
    })

    it("Should return new venue", () => {
        const dummyPayloadOne: VenueResponse = {
            queryInfo: {},
            venues: [dummyVenueOne]
        }
        const result = r.fourSquareResults(initState, {
            type: "FETCHED_VENUES",
            queryInfo: dummyPayloadOne.queryInfo,
            venues: dummyPayloadOne.venues
        })
        expect(result).to.deep.eq([...initState, dummyPayloadOne])
    })
})

// --- Current Results--- //

describe("Current Results", () => {

    interface CRAction {
        type?: string;
        queryInfo?: QueryInfo;
        venues?: Venue[]
        id?: string;
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

    it("should return empty after FETCHING_VENUES called", () => {
        const result = r.currentResults(dummyState, { type: "FETCHING_VENUES" })
        expect(result).to.deep.eq(initState)
    })

    it("Should return venues", () => {
        const action: CRAction = {
            type: "FETCHED_VENUES",
            queryInfo: {},
            venues: [
                dummyVenueOne
            ]
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

    it("Should set visited to true on VISITED_VENUE", () => {
        const stateBefore: VenueResponse = {
            queryInfo: {},
            venues: [{
                ...dummyVenueOne,
                seen: false,
                visited: false
            }]
        }
        const stateAfter: VenueResponse = {
            queryInfo: {},
            venues: [{
                ...dummyVenueOne,
                seen: false,
                visited: true
            }]
        }
        const result = r.currentResults(stateBefore, a.VISITED_VENUE(dummyVenueOne, dummyVenueOne.id))

        expect(result).to.deep.eq(stateAfter)

    })

    it("Should set visited to true on LETS_GO && NEXT_VENUE", () => {
        const stateBefore: VenueResponse = {
            queryInfo: {},
            venues: [{
                ...dummyVenueOne,
                seen: false,
                visited: false
            }]
        }
        const stateAfter: VenueResponse = {
            queryInfo: {},
            venues: [{
                ...dummyVenueOne,
                seen: true,
                visited: false
            }]
        }
        const result = r.currentResults(stateBefore, a.LETS_GO(dummyVenueOne))

        expect(result).to.deep.eq(stateAfter)

    })
})

describe("Visited Venues", () => {

    interface VVAction {
        type: string;
        id?: string;
        venue?: Venue;
    }
    const initState: r.visitedVenues = {
        visitedIds: [],
        visitedVenues: []
    }


    const emptyAction: VVAction = {
        type: ""
    }

    const visitedAction: VVAction = {
        type: "VISITED_VENUE",
        id: dummyVenueOne.id,
        venue: dummyVenueOne
    }
    it("Should return default on empty action", () => {
        const result = r.visitedVenues(initState, emptyAction)

        expect(result).to.deep.eq(initState)
    })

    it("should return 1 id and 1 venue", () => {
        const result = r.visitedVenues(initState, visitedAction)
        const stateAfter: r.visitedVenues = {
            visitedIds: ["123"],
            visitedVenues: [dummyVenueOne]
        }

        expect(result).to.deep.eq(stateAfter)
    })
})