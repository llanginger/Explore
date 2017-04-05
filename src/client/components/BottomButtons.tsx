import * as React from "react"
import { BaseReduxProps } from "../Interfaces"
import { NEXT_VENUE, PREV_VENUE } from "../actions/actions"
import styled from "styled-components"

export const BottomButtons = (props: BaseReduxProps) => {

    const { store } = props

    const Container = styled.div`
        position: absolute;
        bottom: 15%;
        width: 50%;
        left: 25%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `

    const BottomButton = styled.button`
        color: white;
        cursor: pointer;
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 5px solid white;
        background: rgba(0,0,0,0.3);
        filter: drop-shadow(5px 5px 7px #333);
        transition: all .02s ease-in-out;

        &:focus {
            outline: none;
        }

        &:active {
            transform: translateY(3px);
            filter: drop-shadow(2px 2px 7px #333);
        }
    `

    const currentVenue = store.getState().currentVenue
    const inputState = store.getState().homeInputState
    const venues = store.getState().currentResults.venues

    const getNextVenue = () => {
        console.log("Current venue: ", currentVenue);
        for (let venue of venues) {
            if (venue.seen === false && venue.visited !== true) {
                return venue
            }
        }
        return currentVenue
    }

    // --- FIGURE THIS OUT --- //
    const getLastVenue = () => {
        console.log("Current venue: ", currentVenue);
        for (let i = 0; i < venues.length; i++) {
            if (i > 0 && venues[i].id === currentVenue.id) {
                console.log("Successfully retrived previous venue: ", venues[i - 1]);
                return { ...venues[i - 1], seen: false }
            }
        }
    }

    const handlePrev = () => {
        store.dispatch(PREV_VENUE(getLastVenue(), currentVenue))
    }

    const handleNext = () => {
        store.dispatch(NEXT_VENUE(getNextVenue()))
    }
    if (venues.length > 0 && inputState.active == false) {

        return (
            <Container>
                <BottomButton onClick={handlePrev} >Back</BottomButton>
                <BottomButton onClick={handleNext} >Next</BottomButton>
            </Container>
        )
    } else {
        return <div />
    }
}