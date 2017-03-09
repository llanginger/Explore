import * as React from "react"
import { BaseReduxProps } from "../Interfaces"
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export const BottomArea = (props: BaseReduxProps) => {

    const { store } = props
    const venues = store.getState().currentResults.results
    if (venues.length === 0) {
        return <div></div>
    } else {
        if (venues.length > 0) {
            const show = store.getState().bottomArea.show
            const venue = venues[0]
            const containerStyles = {
                height: show ? "100%" : "20%",
                width: show ? "100%" : "90%",
                left: show ? "0px" : "5%",
                position: "absolute",
                bottom: show ? "0px" : "-80px",
                background: "orangered",
                borderRadius: show ? "0px" : "10px 10px 0px 0px",
                boxShadow: show ? "none" : "5px 5px 12px #888",
                transition: "all .5s"
            }

            const imageStyles = {
                height: show ? "200px" : "200px",
                width: show ? "100%" : "100%",
                borderRadius: show ? "0px" : "10px 10px 0px 0px",
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
                if (show === true) {
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
                    key={Date.now()}
                    style={ containerStyles }
                >

                    <img 
                        style={imageStyles}
                        src={venue.photoSrc[0]}
                        onClick={() => {
                            store.dispatch({
                                type: "TOGGLE_BOTTOM_AREA"
                            })
                        }}
                    />
                    {renderList()}
                </div>
               
            )
        } else {
            return (
                <div
                    style={{
                        height: "20%",
                        width: "100%",
                        background: "orangered"
                    }}
                >

                </div>
            )
        }

    }
    
}