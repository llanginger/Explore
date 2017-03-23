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
    if (venues.length > 0 && inputState.active == false) {

        return (
            <div
                style={containerStyles}
            >
                <button
                    className="bottomButton"
                    style={buttonStyles}
                    onClick={() => {
                        store.dispatch(NEXT_VENUE())
                    }}
                >
                    Back
                </button>
                <button
                    className="bottomButton"
                    style={buttonStyles}
                    onClick={() => {
                        store.dispatch(PREV_VENUE())
                    }}
                >
                    Next
                </button>
            </div>
        )
    } else {
        return <div />
    }
}