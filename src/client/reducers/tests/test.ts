import { expect } from "chai"
import * as r from "../reducers"

describe("Spinner Reducer", () => {
    const initState = false
    it("should return false", () => {
        const result = r.spinner(initState, {});
        expect(result).to.deep.equal(false)
    })
    it("should return true", () => {
        const result = r.spinner(initState, {
            type: "FETCHING_VENUES"
        });
        expect(result).to.deep.equal(true)
    })
})

describe("Current Results Reducer", () => {
    const initState = { 
        queryInfo: {}, 
        results: [] 
    }

    it("Should return empty", () => {
        const result = r.currentResults(initState, {})
        expect(result).to.deep.eq(initState)
    })
    
    it("Should return venues", () => {
        const action = {
            type: "FETCHED_VENUES",
            payload: {
                queryInfo: {}, 
                results: [
                    {
                        name: "venueName",
                        id: "12345689",
                        lat: 123,
                        lng: 456,
                        visited: false
                    }
                ] 
            }
        }
        const stateAfter = { 
            queryInfo: {}, 
            results: [
                {
                    name: "venueName",
                    id: "12345689",
                    lat: 123,
                    lng: 456,
                    visited: false
                }
            ] 
        }
        const result = r.currentResults(initState, action)

        expect(result).to.deep.eq(stateAfter)
    })
})