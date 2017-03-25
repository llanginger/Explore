import * as React from "react"
import { BaseReduxProps } from "../Interfaces"

export interface OverlayProps extends BaseReduxProps {
}

export const Overlay = (props: OverlayProps) => {

    const { store } = props
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