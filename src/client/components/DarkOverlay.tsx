import * as React from "react"
import styled from "styled-components"
import { OVERLAY_CLICKED } from "../actions/actions"

interface DOProps {
    active: boolean;
    store: any;
}

export const DarkOverlay = (props: DOProps) => {

    const { store } = props
    const Overlay: any = styled.div`
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: ${(props: DOProps) => props.active ? "500" : "-1"};
        background-color: #333;
        opacity: ${(props: DOProps) => props.active ? "0.5" : "0"};
        transition: all .5s linear;
    `

    return (
        <Overlay
            active={props.active}
            onClick={() => { store.dispatch(OVERLAY_CLICKED()) }}
        >
        </Overlay>
    )
}