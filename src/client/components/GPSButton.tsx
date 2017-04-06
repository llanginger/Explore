import * as React from "react"
import styled from "styled-components"
import { BaseReduxProps } from "../Interfaces"

export const GPSButton = (props: BaseReduxProps) => {

    const venues = props.store.getState().currentResults.venues
    const inputState = props.store.getState().homeInputState

    const Button = styled.button`
        position: absolute;
        bottom: 25%;
        right: 5%;
        background: transparent;
        border: none;
        color: #333;
        font-size: 32px;
        filter: drop-shadow(3px 3px 3px #333);
        transition: transform .02s ease-in-out;

        &:active {
            outline: none;
            transform: translateY(1px)
            filter: drop-shadow(2px 2px 2p #333)
        }

        &:focus {
            outline: none;
        }
    `
    if (venues.length > 0 && inputState.active == false) {
        return (
            <Button><span className="pt-icon pt-icon-locate" /></Button>
        )
    } else {
        return null
    }

}