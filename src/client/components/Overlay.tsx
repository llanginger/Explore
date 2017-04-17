import * as React from "react"
import { BaseReduxProps } from "../Interfaces"
import { BLUR_INPUT } from "../actions/actions"
import styled from "styled-components";
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"


export interface OverlayProps extends BaseReduxProps {
}

export const Overlay = (props: OverlayProps) => {

    const colors = props.store.getState().colors

    const Over = styled.div`
        background: ${colors.ACCENT};
        opacity: 0.5;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    `

    const { store } = props
    const OverlayIconStyles = {
        color: "white"
    }

    return (
        <Over
            onClick={() => store.dispatch(BLUR_INPUT())}
        >
        </Over>
    )
} 