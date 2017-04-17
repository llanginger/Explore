import * as React from "react"
import styled from "styled-components"
import { OVERLAY_CLICKED } from "../actions/actions"

interface DOProps {
    active: boolean;
    store: any;
}

const Overlay: any = styled.div`
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 500;
        background-color: #333;
        pointer-events: ${(props: DOProps) => props.active ? "all" : "none"};
        opacity: ${(props: DOProps) => props.active ? "0.5" : "0"};
        transition: all .5s linear;
    `
export const DarkOverlay = (props: DOProps) => {

    const { store } = props

    return (
        <Overlay
            active={props.active}
            onClick={() => { store.dispatch(OVERLAY_CLICKED()) }}
        >
        </Overlay>
    )
}