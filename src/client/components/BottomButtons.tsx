import * as React from "react"
import { BaseReduxProps } from "../Interfaces"
import { NEXT_VENUE, PREV_VENUE } from "../actions/actions"
import styled, { keyframes } from "styled-components"

const fadeInLeft = keyframes`
    0% {
        transform: scale(0.4) translate(-10px, 10px);
        opacity: 0.3;
    }

    66% {
        transform: scale(0.8) translate(-3px, 3px);
        opacity: 0.5;        
    }

    100% {
        transform: scale(1) translate(0px, 0px);
        opacity: 1;
    }
`

const fadeInRight = keyframes`
    0% {
        transform: scale(0.4) translate(10px, 10px);
        opacity: 0.3;
    }

    66% {
        transform: scale(0.5) translate(3px, 3px);
        opacity: 0.5;        
    }

    100% {
        transform: scale(1) translate(0px, 0px);
        opacity: 1;
    }
`


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
    animation: ${ fadeInLeft} .2s ease-in-out forwards;

    &:focus {
        outline: none;
    }

    &:active {
        transform: translateY(3px);
        filter: drop-shadow(2px 2px 7px #333);
    }
`

const RightButton = styled(BottomButton) `
    animation: ${ fadeInRight} .2s ease-in-out forwards
`

export const BottomButtons = (props: BaseReduxProps) => {

    const { store } = props


    const currentVenue = store.getState().currentVenue
    const inputState = store.getState().homeInputState
    const venues = store.getState().currentResults.venues

    const getNextVenue = () => {
        for (let venue of venues) {
            if (venue.seen === false && venue.visited !== true) {
                return venue
            }
        }
        return currentVenue
    }

    const getLastVenue = () => {
        for (let i = 0; i < venues.length; i++) {
            if (i > 0 && venues[i].id === currentVenue.id) {
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
                <RightButton onClick={handleNext} >Next</RightButton>
            </Container>
        )
    } else {
        return <div />
    }
}