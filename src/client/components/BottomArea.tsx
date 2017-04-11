import * as React from "react"
import { BaseReduxProps } from "../Interfaces"
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import * as classNames from "classnames"
import { Reusable } from "./Components"
import { TOGGLE_BOTTOM_AREA, NEXT_VENUE, PREV_VENUE, SHOW_DIRECTIONS } from "../actions/actions"
import { Colors } from "./Utility/Colors"
import styled from "styled-components"
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

interface CProps extends ContainerProps { }

export const BottomArea = (props: BaseReduxProps) => {


    const { store } = props
    const venue = store.getState().currentVenue
    const big = store.getState().bottomArea.big
    const show = store.getState().bottomArea.show
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

    const renderList = () => {

        const topBarClick = () => {
            store.dispatch(TOGGLE_BOTTOM_AREA())
        }

        const bottomButtonClick = () => {
            store.dispatch(SHOW_DIRECTIONS(directionsObj()))
        }

        if (big === true) {
            return (
                <BottomAreaList
                    venue={venue}
                    topBarOnclick={topBarClick}
                    bottomButtonOnClick={bottomButtonClick}
                    bottomButtonText="Take Me Here!"
                />
            )
        } else {
            return null
        }
    }

    const renderButtons = () => {
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

        if (big === true) {
            return (
                <BottomAreaButtons
                    leftButtonOnClick={handlePrev}
                    rightButtonOnClick={handleNext}
                />
            )
        } else {
            return null;
        }
    }

    // --- ??? Why does this work here but not from imported module? --- //
    const Container = styled.div`
        background: ${Colors.GOOD};
        position: absolute;
        height: ${(props: CProps) => props.big ? "100%" : "20%"};
        width: ${(props: CProps) => props.big ? "100%" : "90%"};
        left: ${(props: CProps) => props.big ? "0%" : "5%"};
        bottom: ${(props: CProps) => props.big ? "0px" : "-80px"};
        border-radius: ${(props: CProps) => props.big ? "0px" : "10px 10px 0px 0px"};
        box-shadow: ${(props: CProps) => props.big ? "none" : "5px 5px 7px #333"};
        display: flex;
        flex-direction: column;
        
    `

    return (
        <Container
            className="bottomArea"
            big={big}
        >
            <BottomAreaImage
                onClick={() => {
                    store.dispatch(TOGGLE_BOTTOM_AREA())
                }}
                big={big}
                image={venue.photoSrc[0]}
            >
                {renderButtons()}
            </BottomAreaImage>
            {renderList()}
        </Container>

    )
}
