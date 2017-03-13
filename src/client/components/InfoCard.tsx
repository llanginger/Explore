import { BaseReduxProps } from "../Interfaces"
import * as React from "react"

export interface InfoCardProps extends BaseReduxProps {

}

export const InfoCard = (props: InfoCardProps) => {
    
    const { store } = props
    const venues = store.getState().currentResults.results
    const inputState = store.getState().homeInputState.active
    if (venues.length > 0 && inputState == false) {
        const venue = venues[0]
        const { rating } = venue
        const pickRatingColor = () => {
            if (rating >= 7) {
                return "#0F9960"
            } else if (rating >= 4) {
                return "#D9822B"
            } else if (rating >= 0) {
                return "#F55656"
            } else {
                return "#669EFF"
            }
        }

        const infoCardStyles = {
            color: "white",
            boxShadow: "5px 5px 5px #333",
            width: "90%",
            position: "absolute",
            top: "19%",
            left: "5%",
        }

        const ratingStyles = {
            position: "absolute",
            boxShadow: "5px 5px 10px #333",
            bottom: "-10px",
            right: "-10px",
            padding: "8px",
            color: "white",
            borderRadius: "50%",
            background: pickRatingColor()
        }

        return (
            <div
                onClick={() => {
                    store.dispatch({
                        type: "TOGGLE_BOTTOM_AREA"
                    })
                }}
                style={infoCardStyles}
            >
                <div className="iwTitle">
                    {venue.name}
                </div>
                <div className="iwContent">
                    {venue.reviews[0].substr(0, 49)}...
                </div>
                <div 
                    style={ratingStyles}
                >
                    {venue.rating.toFixed(1)}
                </div>
            </div>
        )
    } else {
        return <div />
    }
    
}