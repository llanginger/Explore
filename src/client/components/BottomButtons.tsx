import * as React from "react"
import { BaseReduxProps } from "../Interfaces"

export const BottomButtons = (props: BaseReduxProps) => {

    const { store } = props

    const containerStyles = {
        position: "absolute",
        bottom: "15%",
        width: "50%",
        left: "25%",
        boxShadow: "5px 5px 5px #333"
    }

    const baseButtonStyles = {
        border: "none",
        color: "white",
        width: "50%",
        height: "60px",
        fontSize: "16px"
    }

    const backButtonStyles = {
        ...baseButtonStyles,
        background: "#0732a2",
        borderRadius: "5px 0px 0px 5px"
    }

    const forwardButtonStyles = {
        ...baseButtonStyles,
        background: "#669EFF",
        borderRadius: "0px 5px 5px 0px"
    }

    const inputState = store.getState().homeInputState
    const venues = store.getState().currentResults.results
    if (venues.length > 0 && inputState.active == false) {

        return (
            <div
                style={containerStyles}
            >
                <button 
                    style={backButtonStyles}
                    onClick={() => {
                        store.dispatch({
                            type: "NEXT_VENUE"
                        })
                    }}
                >
                Back
                </button>
                <button 
                    style={forwardButtonStyles}
                    onClick={() => {
                        store.dispatch({
                            type: "PREV_VENUE"
                        })
                    }}
                >
                Next
                </button>
            </div>
        )
    } else {
        return <div/>
    }
}