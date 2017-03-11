import * as React from "react"
import { BaseReduxProps } from "../Interfaces"

export interface OverlayProps extends BaseReduxProps {
}

export const Overlay = (props: OverlayProps) => {

    const { store } = props
    // const OverlayStyles = {
    //     background: "#B10DC9",
    //     opacity: 0.7,
    //     height: "100%",
    //     width: "100%",
    //     position: "absolute",
    //     top: "0",
    //     left: "0",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center"
    // }

    const OverlayIconStyles = {
        color: "white"
    }

    return (
        <div
            className="overlay"
        >
            <span
                style={OverlayIconStyles}
            >
                Icon here
            </span>
        </div>
        )
    } 