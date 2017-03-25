import * as React from "react"
import { BaseReduxProps } from "../Interfaces"
import { NEXT_VENUE, PREV_VENUE } from "../actions/actions"

export const BottomButtons = (props: BaseReduxProps) => {

    const { store } = props

    const containerStyles = {
        position: "absolute",
        bottom: "15%",
        width: "50%",
        left: "25%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }

    const buttonStyles = {
        cursor: "pointer",
        width: "60px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        borderRadius: "50%",
        border: "5px solid white",
        background: "rgba(0,0,0,0.3)",
    }

    const inputState = store.getState().homeInputState
    const venues = store.getState().currentResults.venues

    const getNextVenue = () => {
        console.log("Next venue clicked")
        console.log("Next venues to pick from: ", venues)
        for (let venue of venues) {

            if (venue.seen === false && venue.visited !== true) {
                console.log("Next venue: ", venue)
                return venue
            }
        }
    }

    const handlePrev = () => {

    }

    const handleNext = () => {
        store.dispatch(NEXT_VENUE(getNextVenue()))
    }
    if (venues.length > 0 && inputState.active == false) {

        return (
            <div
                style={containerStyles}
            >
                <button
                    className="bottomButton"
                    style={buttonStyles}
                    onClick={handlePrev}

                >
                    Back
                </button>
                <button
                    className="bottomButton"
                    style={buttonStyles}
                    onClick={handleNext}

                >
                    Next
                </button>
            </div>
        )
    } else {
        return <div />
    }
}