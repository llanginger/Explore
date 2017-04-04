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

    const currentVenue = store.getState().currentVenue
    const inputState = store.getState().homeInputState
    const venues = store.getState().currentResults.venues

    const getNextVenue = () => {
        console.log("Current venue: ", currentVenue);
        for (let venue of venues) {
            if (venue.seen === false && venue.visited !== true) {
                return venue
            }
        }
        return currentVenue
    }

    // --- FIGURE THIS OUT --- //
    const getLastVenue = () => {
        console.log("Current venue: ", currentVenue);
        for (let i = 0; i < venues.length; i++) {
            if (i > 0 && venues[i].id === currentVenue.id) {
                console.log("Successfully retrived previous venue: ", venues[i - 1]);
                return { ...venues[i - 1], seen: false }
            }
        }
    }

    const handlePrev = () => {
        store.dispatch(PREV_VENUE(getLastVenue(), currentVenue))
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