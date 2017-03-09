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
            width: "70%",
            position: "absolute",
            top: "25%",
            left: "15%",
        }

        const ratingStyles = {
            position: "absolute",
            boxShadow: "5px 5px 10px #333",
            bottom: "-16px",
            right: "-16px",
            padding: "8px 12px 8px 12px",
            color: "white",
            borderRadius: "50%",
            background: pickRatingColor()
        }

        return (
            <div style={infoCardStyles}>
                <div className="iwTitle">
                    {venue.name}
                </div>
                <div className="iwContent">
                    {venue.reviews[0].substr(0, 49)}...
                </div>
                <div 
                    style={ratingStyles}
                >
                    {venue.rating}
                </div>
            </div>
        )
    } else {
        return <div />
    }
    
}