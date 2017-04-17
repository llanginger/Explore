import * as React from "react"
import styled from "styled-components"
import { BaseReduxProps } from "../Interfaces"
import { FOCUS_USER_MARKER } from "../actions/actions"

export const GPSButton = (props: BaseReduxProps) => {

    const Store = props.store.getState()

    const venues = Store.currentResults.venues
    const inputState = Store.homeInputState
    const userMarker: google.maps.Marker = Store.userReducer.positionMarker
    const colors = Store.colors

    const Button = styled.button`
        position: absolute;
        bottom: 25%;
        right: 5%;
        background: transparent;
        border: none;
        color: ${colors.ACCENT};
        font-size: 32px;
        filter: drop-shadow(1px 1px 1px black);
        transition: transform .02s ease-in-out;
        cursor: pointer;

        &:active {
            outline: none;
            transform: translateY(1px)
            filter: drop-shadow(0px 0px 1px #333)
        }

        &:focus {
            outline: none;
        }
    `

    const focusUser = () => {
        console.log("marker pos: ", userMarker.getPosition());
        props.store.dispatch(FOCUS_USER_MARKER(userMarker.getPosition()))
    }

    if (venues.length > 0 && inputState.active == false) {
        return (
            <Button onClick={focusUser}><span className="pt-icon pt-icon-locate" /></Button>
        )
    } else {
        return null
    }

}