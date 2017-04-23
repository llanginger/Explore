import * as React from "react"
import { BaseReduxProps } from "../Interfaces"
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import * as classNames from "classnames"
import { Reusable } from "./Components"
import { TOGGLE_BOTTOM_AREA, NEXT_VENUE, PREV_VENUE, SHOW_DIRECTIONS, BOTTOM_AREA_BIG, BOTTOM_AREA_SMALL } from "../actions/actions"
import { Colors } from "./Utility/Colors"
import styled, { keyframes } from "styled-components"
import { BottomAreaList } from "./BottomAreaComponents/BottomAreaList"
import { BottomAreaButtons } from "./BottomAreaComponents/BottomAreaButtons"
import { BottomAreaImage } from "./BottomAreaComponents/BottomAreaImage"
import { BottomAreaContainer } from "./BottomAreaComponents/BottomAreaContainer"

interface LatLng {
    lat: number;
    lng: number;
}


interface ContainerProps {
    big: boolean
    className: string;
}

interface CProps extends ContainerProps {
    color: Colors;
}

const rise = keyframes`
    0% { transform: translateY(90px); }
    100% { transform: translateY(0px) ; }
`

const Container: any = styled.div`
    background: transparent;
    position: absolute;
    z-index: ${(props: CProps) => props.big ? "11" : "6"};
    height: ${(props: CProps) => props.big ? "100%" : "20%"};
    width: ${(props: CProps) => props.big ? "100%" : "90%"};
    left: ${(props: CProps) => props.big ? "0%" : "5%"};
    bottom: ${(props: CProps) => props.big ? "0px" : "-80px"};
    border-radius: ${(props: CProps) => props.big ? "0px" : "10px 10px 0px 0px"};
    box-shadow: ${(props: CProps) => props.big ? "none" : "5px 5px 7px #333"};
    display: flex;
    flex-direction: column;
    transition: all .3s ease-in-out;

    @media(min-width: 700px) and (min-height: 800px) {
        height: ${(props: CProps) => props.big ? "100%" : "170px"};
    }

    animation: ${rise} .3s ease-in-out forwards;
    
`

export const BottomArea = (props: BaseReduxProps) => {


    const { store } = props
    const venue = store.getState().currentVenue
    const big = store.getState().bottomArea.big
    const show = store.getState().bottomArea.show
    const colors = store.getState().colors
    const userMarker: google.maps.Marker = store.getState().userReducer.positionMarker

    const baClasses = classNames({
        "bottomArea": true,
        "big": big,
        "small": !big,
    })

    const venues = store.getState().currentResults.venues
    const currentVenue = store.getState().currentVenue


    const directionsObj = () => {
        const start = { lat: userMarker.getPosition().lat(), lng: userMarker.getPosition().lng() }
        const end = { lat: currentVenue.location.lat, lng: currentVenue.location.lng }
        const result: { start: LatLng, end: LatLng } = { start, end }
        console.log(" Start/End Result: ", result);
        return result
    }

    const topBarClick = () => {
        store.dispatch(TOGGLE_BOTTOM_AREA())
    }

    const bottomButtonClick = () => {
        store.dispatch(SHOW_DIRECTIONS(directionsObj()))
    }


    const getNextVenue = () => {
        for (let venue of venues) {
            if (venue.seen === false && venue.visited !== true) {
                return venue
            }
        }
    }

    const handleNext = (e) => {
        e.stopPropagation()
        store.dispatch(NEXT_VENUE(getNextVenue()))
    }

    const getLastVenue = () => {
        console.log("Current venue: ", currentVenue);
        for (let i = 0; i < venues.length; i++) {
            if (i > 0 && venues[i].id === currentVenue.id) {
                console.log("Successfully retrived previous venue: ", venues[i - 1]);
                return { ...venues[i - 1], seen: false }
            }
        }
    }

    const handlePrev = (e) => {
        e.stopPropagation()
        store.dispatch(PREV_VENUE(getLastVenue(), currentVenue))
    }

    const renderButtons = () => {

        if (big === true) {
            console.log("Bottom area buttons think big is true");
            return (
                <BottomAreaButtons
                    leftButtonOnClick={handlePrev}
                    rightButtonOnClick={handleNext}
                />
            )
        } else {
            console.log("Bottom area buttons think big is not true");
            return null;
        }
    }

    const bottomAreaSize = () => {
        if (!big) {
            store.dispatch(BOTTOM_AREA_BIG())
        } else {
            store.dispatch(BOTTOM_AREA_SMALL())
        }
    }

    // --- ??? Why does this work here but not from imported module? --- //


    return (
        <Container
            className="bottomArea"
            big={big}
            color={Colors}
        >
            <BottomAreaImage
                onClick={bottomAreaSize}
                big={big}
                image={venue.photoSrc[0]}
                children={renderButtons()}
            >
            </BottomAreaImage>
            <BottomAreaList
                venue={venue}
                topBarOnclick={bottomAreaSize}
                bottomButtonOnClick={bottomButtonClick}
                bottomButtonText="Take Me Here!"
                colors={colors}
                store={store}
            />
        </Container>

    )
}
