import * as React from "react"
import { BaseReduxProps } from "../Interfaces"
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import * as classNames from "classnames"
import { Reusable } from "./Components"
import { TOGGLE_BOTTOM_AREA, NEXT_VENUE, PREV_VENUE } from "../actions/actions"
import styled from "styled-components"

export const BottomArea = (props: BaseReduxProps) => {


    const { store } = props
    const venue = store.getState().currentVenue
    const big = store.getState().bottomArea.big
    const show = store.getState().bottomArea.show

    const imageStyles = {
        height: big ? "200px" : "100%",
        width: big ? "100%" : "100%",
        borderRadius: big ? "0px" : "10px 10px 0px 0px",
        transition: "all .5s",
        backgroundImage: "url('" + venue.photoSrc[0] + "')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center"
    }


    const ReviewList = styled.ul`
        background: white;
        width: 100%;
        margin: 0px;
        height: 100%;
        padding: 30px 10px 0px 10px;
        list-style-type: none;
        overflow-y: scroll;

        &::-webkit-scrollbar {
            display: none;
        }
    `


    const liStyles = {
        borderBottom: "1px #888 solid",
        marginBottom: "10px",
        paddingBottom: "10px"
    }


    const ListItem = styled.li`
        border-bottom: 1px solid $888;
        margin-bottom: 10px;
        parrind-bottom: 10px;
    `

    const baClasses = classNames({
        "bottomArea": true,
        "big": big,
        "small": !big,
    })


    const RightButton = styled.button`
        position: absolute;
        right: 10px;
        font-size: 48px;
        background: transparent;
        padding: 5px;
        border: none;
        color: black;
        
        &:focus {
            outline: none;
        }
    `

    const LeftButton = styled.button`
        position: absolute;
        left: 10px;
        font-size: 48px;
        background: transparent;
        padding: 5px;
        border: none;
        color: black;

        &:focus {
            outline: none;
        }
    `

    const ReviewContainer = styled.div`
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
    `

    const RightIconSpan = styled.span`
        color: white;
        filter: drop-shadow(6px 1px 2px)
    `

    const LeftIconSpan = styled.span`
        color: white;
        filter: drop-shadow(-6px 1px 2px)
    `


    const venues = store.getState().currentResults.venues
    const currentVenue = store.getState().currentVenue

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


    const mapReviewsToList = () => {
        // Maybe turn this into a factory? Need some way of rendering only a couple
        return venue.reviews.slice(0, 5).map((rev, i) => {
            return (
                <ListItem
                    style={liStyles}
                    key={i}
                >
                    {rev}
                </ListItem>
            )
        })
    }

    const renderList = () => {
        if (big === true) {
            return (
                <ReviewContainer>
                    <Reusable.TopBar
                        onClick={() => {
                            store.dispatch(TOGGLE_BOTTOM_AREA())
                        }}
                        text={venue.name} />
                    <ReviewList>
                        {mapReviewsToList()}
                    </ReviewList>
                    <Reusable.BottomButton
                        onClick={() => console.log("Bottom button pressed")}
                        text="Do something"
                    />
                </ReviewContainer>
            )
        } else {
            return
        }
    }

    const renderButtons = () => {
        if (big === true) {
            return (
                <div style={{ marginTop: "-51px" }}>
                    <LeftButton
                        onClick={handlePrev}
                    >
                        <LeftIconSpan className="pt-icon pt-icon-chevron-left" />
                    </LeftButton>
                    <RightButton
                        onClick={handleNext}
                    >
                        <RightIconSpan className="pt-icon pt-icon-chevron-right" />
                    </RightButton>
                </div>
            )
        }
    }

    console.log("Bottom area logging");
    return (
        <div
            className={baClasses}
            key={Date.now()}
        >
            <div
                className="imgContainer"
                style={imageStyles}
                onClick={() => {
                    store.dispatch(TOGGLE_BOTTOM_AREA())
                }}
            >
                {renderButtons()}
            </div>
            {renderList()}
        </div>

    )
}
