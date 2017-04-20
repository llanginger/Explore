import * as React from "react"
import { BaseReduxProps } from "../Interfaces"
import { BLUR_INPUT } from "../actions/actions"
import styled, { keyframes } from "styled-components";
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"

const fadeIn = keyframes`
    0% { opacity: 1; }
    25% { opacity: 1; }
    100% { opacity: 0; }
`


interface OProps {
    show: boolean
}

const Over: any = styled.div`
    background: ${(props: any) => props.color};
    opacity: 1;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    
    animation: ${fadeIn} 4s linear forwards;
`

export interface OverlayProps extends BaseReduxProps {
}

export const Overlay = (props: OverlayProps) => {

    const show = props.store.getState().initState.showOverlay

    const colors = props.store.getState().colors


    const { store } = props

    return (
        <Over
            show={show}
            color={colors.ACCENT}
            onClick={() => store.dispatch(BLUR_INPUT())}
        >
        </Over>
    )
} 