import { expect } from "chai"
import { Venue, VenueResponse, QueryInfo, User, PAction } from "../../Interfaces"
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
    marker: {},
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
    marker: {},
    categories: [],
    seen: false,
    visited: true
}

// --- LoggedIn --- //

describe("LoggedIn", () => {
    const initState: r.loggedIn = {
        loggedIn: false,
        user: {
            email: "",
            userName: "",
            profilePic: "https://pbs.twimg.com/profile_images/2192831080/cartoon-headshot.png"
        }
    }

    const newUser: User = {
        email: "llanginger@gmail.com",
        userName: "Leo Langinger",
        profilePic: "leo's Profile Pic"
    }


    const newState = { ...initState, loggedIn: true, user: newUser }

    it("Should return false on default", () => {
        const result = r.loggedIn(initState, { type: "" })
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
    const initState: r.spinner = {
        searchResultsSpinner: false,
        imageUploadSpinner: false
    }

    const searchTrue: r.spinner = {
        ...initState,
        searchResultsSpinner: true
    }

    const imageTrue: r.spinner = {
        ...initState,
        imageUploadSpinner: true
    }
    it("should return false", () => {
        const result: r.spinner = r.spinner(initState, { type: "" });
        expect(result).to.deep.equal(initState)
    })

    it("Search should return true", () => {
        const result = r.spinner(initState, a.FETCHING_VENUES());
        expect(result).to.deep.equal(searchTrue)
    })

    it("Image should return false", () => {
        const result = r.spinner(initState, a.UPDATE_PROFILE_PIC(""));
        expect(result).to.deep.equal(initState)
    })

    it("Image should return true", () => {
        const result = r.spinner(initState, a.UPLOADING_PROFILE_PIC());
        expect(result).to.deep.equal(imageTrue)
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
        categories: [],
        marker: undefined
    }
    const newState: Venue = {
        ...initState,
        name: "New Venue 1",
        id: "12345"
    }

    it("Should return empty", () => {
        const result = r.currentVenue(initState, { type: "" })
        expect(result).to.deep.eq(initState)
    })

    it("Should return new state on NEXT_VENUE", () => {

        const result = r.currentVenue(initState, a.NEXT_VENUE(newState))
        expect(result).to.deep.eq({ ...newState, seen: true })
    })

    it("Should return new state on LETS_GO", () => {

        const result = r.currentVenue(initState, a.LETS_GO(newState))
        expect(result).to.deep.eq({ ...newState, seen: true })
    })

    // it("Should return previous venue on PREV_VENUE", () => {

    //     const result = r.currentVenue({ ...dummyVenueTwo, seen: true }, {
    //         type: "PREV_VENUE"
    //     })
    //     expect(result).to.deep.eq({ ...dummyVenueOne, seen: true })
    // })

    it("Should return empty on Clear venues call", () => {
        const result = r.currentVenue(newState, a.CLEAR_VENUES())
        expect(result).to.deep.eq(initState)
    })

})

// --- Seen Venues -- //

describe("SeenVenues", () => {
    it("should return empty on default", () => {
        const result: r.seenVenues = r.seenVenues([], { type: "" })

        expect(result).to.deep.eq([])
    })

    it("should return 1 id", () => {

        const result: r.seenVenues = r.seenVenues([], a.NEXT_VENUE(dummyVenueOne))
        const stateAfter: r.seenVenues = [dummyVenueOne.id]

        expect(result).to.deep.eq(stateAfter)
    })

    it("should return 2 ids", () => {
        const initState = [dummyVenueOne.id]

        const result: r.seenVenues = r.seenVenues(initState, a.NEXT_VENUE(dummyVenueTwo))
        const stateAfter: r.seenVenues = [dummyVenueOne.id, dummyVenueTwo.id]

        expect(result).to.deep.eq(stateAfter)
    })
})

// --- Settings Menu--- //

describe("Settings Menu", () => {
    const initState = { open: false }
    const openState = { open: true }

    it("Should return default (false)", () => {
        const result = r.settingsMenu(initState, { type: "" })
        expect(result).to.deep.eq(initState)
    })

    it("Should return true", () => {
        const result = r.settingsMenu(initState, a.OPEN_MENU())
        expect(result).to.deep.eq(openState)
    })

    it("Should return false", () => {
        const result = r.settingsMenu(openState, a.CLOSE_MENU())
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
        const result = r.settingsPages(initState, { type: "" })
        expect(result).to.deep.eq(initState)
    })

    it("Should return prefs open", () => {
        const result = r.settingsPages(initState, a.SHOW_SETTINGS_PAGE("preferences"))
        expect(result).to.deep.eq(prefsOpen)
    })

    it("Should return default if wrong name", () => {
        const result = r.settingsPages(initState, a.SHOW_SETTINGS_PAGE("lulz"))
        expect(result).to.deep.eq(initState)
    })
})

// --- Init State --- //

describe("Init State", () => {

    const initState: r.initState = {
        showMainInputHelp: true,
        showOverlay: true,
        showThemeOptions: false
    }

    const mainInputFalse: r.initState = {
        showMainInputHelp: false,
        showOverlay: true,
        showThemeOptions: false
    }

    const overlayFalse: r.initState = {
        showMainInputHelp: true,
        showOverlay: false,
        showThemeOptions: false
    }

    it("Should return all true (default)", () => {
        const result = r.initState(initState, { type: "" })
        expect(result).to.deep.eq(initState)
    })

    it("Should return Main Input false", () => {
        const result = r.initState(initState, a.DISMISS_MAIN_INPUT_HELP())
        expect(result).to.deep.eq(mainInputFalse)
    })

    it("Should return Main Input false", () => {
        const result = r.initState(initState, a.FETCHED_VENUES())
        expect(result).to.deep.eq(overlayFalse)
    })
})

// --- Foursquare Results --- //

describe("FourSquare Results", () => {
    const initState: r.fourSquareResults[] = [{ queryInfo: {}, venues: [] }]
    const dummyState: r.fourSquareResults[] = [{ queryInfo: {}, venues: [dummyVenueOne] }]
    const fetchingValuesState: r.fourSquareResults[] = [...initState]

    it("Should return initState on default", () => {
        const result = r.fourSquareResults(initState, { type: "" })
        expect(result).to.deep.eq(initState)
    })

    it("Should return initState on fetching venues", () => {
        const result = r.fourSquareResults(initState, a.FETCHING_VENUES())
        expect(result).to.deep.eq(fetchingValuesState)
    })

    it("Should return new venue", () => {
        const dummyPayloadOne: r.fourSquareResults = {
            queryInfo: {},
            venues: [dummyVenueOne]
        }
        const result = r.fourSquareResults(initState, a.FETCHED_VENUES(dummyPayloadOne.venues, [], dummyPayloadOne.queryInfo))
        expect(result).to.deep.eq([...initState, dummyPayloadOne])
    })
})

// --- Current Results --- //

describe("Current Results", () => {

    const unVisitedDummyVenueOne: Venue = {
        location: {},
        contact: {},
        name: "House of Pancakes",
        id: "123",
        photoSrc: [],
        reviews: [],
        rating: null,
        categories: [],
        seen: true,
        visited: false
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
        const result = r.currentResults(initState, { type: "" })
        expect(result).to.deep.eq(initState)
    })

    it("should return empty after FETCHING_VENUES called", () => {
        const result = r.currentResults(dummyState, a.FETCHING_VENUES())
        expect(result).to.deep.eq(initState)
    })

    it("Should return venues", () => {

        const stateAfter: VenueResponse = {
            queryInfo: {},
            venues: [
                unVisitedDummyVenueOne
            ]
        }
        const result = r.currentResults(initState, a.FETCHED_VENUES([unVisitedDummyVenueOne, dummyVenueTwo], [dummyVenueTwo.id], {}))

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

// --- VISITED VENUES --- //

describe("Visited Venues", () => {

    const initState: r.visitedVenues = {
        visitedIds: [],
        visitedVenues: []
    }


    const emptyAction: PAction = {
        type: ""
    }

    const visitedAction: PAction = {
        type: "VISITED_VENUE",
        payload: {
            id: dummyVenueOne.id,
            venue: dummyVenueOne
        }
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

// --- GPS --- //

// describe("GPS", () => {
//     const initState = {

//     }
// })