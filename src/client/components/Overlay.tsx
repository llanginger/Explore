import * as React from "react"
import { BaseReduxProps } from "../Interfaces"
import { BLUR_INPUT } from "../actions/actions"

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
            onClick={() => store.dispatch(BLUR_INPUT())}
        >
        </div>
    )
} 