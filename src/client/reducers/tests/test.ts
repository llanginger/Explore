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

    const dummyState = { 
        queryInfo: {}, results: [
            {
                id: "439169aaf964a5205a2b1fe3",
                lat: 47.61468356299946,
                lng: -122.3197603225708,
                name: "Elliott Bay Book Company",
                photoSrc: ["https://igx.4sqi.net/img/general/300x200/632744_bLPOkj3Hivc915Rvum06rtNAh0GGpj4ZdtZuQfOe0Bo.jpg"],
                reviews: ["Used to be located in Pioneer Square, the Elliott Bay Book Company is the local bookstore for those who live on Capitol Hill. You'll find odd titles and local authors here. Don't forget about the café"],
                rating: 8
            }
        ] 
    }

    it("Should return empty", () => {
        const result = r.currentResults(initState, {})
        expect(result).to.deep.eq(initState)
    })

    it("should return empty after fetching values called", () => {
        const result = r.currentResults(dummyState, { type: "FETCHING_VENUES"})
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