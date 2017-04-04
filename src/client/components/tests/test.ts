import { expect } from "chai"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { createStore, applyMiddleware, Store, compose } from "redux"
import { default as thunk } from "redux-thunk";
import { Reducers } from "../../Store"
import * as i from "../../Interfaces"
import { dummyData } from "./dummyData"
import * as a from "../../actions/actions"

let store: Store<Reducers> = createStore(Reducers)

describe("Test store", () => {

    describe("bottom area", () => {

        it("Should return default bottom area", () => {
            interface bottomArea {
                show: boolean;
                big: boolean;
            }
            const bottomArea: bottomArea = store.getState().bottomArea
            const defaultState: bottomArea = { show: false, big: false }
            expect(bottomArea).to.deep.eq(defaultState)
        })
    })

    describe("currentResults", () => {
        interface currentResults {
            queryInfo: i.QueryInfo;
            venues: i.Venue[]
        }
        const currentResults = store.getState().currentResults
        const defaultState: currentResults = { queryInfo: {}, venues: [] }

        it("Should retrieve currentResults", () => {
            expect(currentResults).to.deep.eq(defaultState)
        })

        describe("Using dummyData", () => {
            store.dispatch(a.FETCHED_VENUES(dummyData, [], {}))
            const result = store.getState().currentResults

            it("Should return dummyData", () => {
                expect(result.venues).to.deep.eq(dummyData)
            })

            it("Should return random unseen venue", () => {
                const getNewVenue = () => {
                    for (let venue of result.venues) {
                        if (venue.seen === false) {
                            return venue
                        }
                    }
                }

                const newVenue = getNewVenue()
                store.dispatch(a.NEXT_VENUE(newVenue))
                const currentVenue = store.getState().currentVenue
                expect(currentVenue).to.deep.eq({ ...newVenue, seen: true })
            })
        })
    })


})
