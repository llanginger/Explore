import * as React from "react"
import { BaseReduxProps } from "../Interfaces"
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import * as classNames from "classnames"
import { TOGGLE_BOTTOM_AREA } from "../actions/actions"

export const BottomArea = (props: BaseReduxProps) => {


    const { store } = props
    const venue = store.getState().currentVenue
    const big = store.getState().bottomArea.big
    const show = store.getState().bottomArea.show

    const imageStyles = {
        height: big ? "200px" : "200px",
        width: big ? "100%" : "100%",
        borderRadius: big ? "0px" : "10px 10px 0px 0px",
        transition: "all .5s"
    }

    const ulStyles = {
        background: "white",
        width: "90%",
        marginLeft: "5%",
        maxHeight: "45%",
        padding: "5px 10px",
        listStyleType: "none",
        overflowY: "scroll"
    }

    const liStyles = {
        borderBottom: "1px #888 solid",
        marginBottom: "10px",
        paddingBottom: "10px"
    }

    const baClasses = classNames({
        "bottomArea": true,
        "big": big,
        "small": !big,
    })


    const mapReviewsToList = () => {
        // Maybe turn this into a factory? Need some way of rendering only a couple
        return venue.reviews.slice(0, 5).map((rev, i) => {
            return (
                <li
                    style={liStyles}
                    key={i}
                >
                    {rev}
                </li>
            )
        })
    }

    const renderList = () => {
        if (big === true) {
            return (
                <ul style={ulStyles}>
                    {mapReviewsToList()}
                </ul>
            )
        } else {
            return
        }
    }

    return (
        <div
            className={baClasses}
            key={Date.now()}
        >
            <img
                style={imageStyles}
                src={venue.photoSrc[0]}
                onClick={() => {
                    store.dispatch(TOGGLE_BOTTOM_AREA())
                }}
            />
            {renderList()}
        </div>

    )
}
