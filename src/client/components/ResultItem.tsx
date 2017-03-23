import * as React from "react"
import { Venue, BaseReduxProps } from "../Interfaces"
import { VISITED_VENUE } from "../actions/actions"

interface ResultItemProps extends BaseReduxProps {
    venue: Venue
}

export const ResultItem = (props: ResultItemProps) => {
    const bgColor = (rating) => {
        if (rating > 6.9) {
            return "#0F9960"
        } else if (rating > 3.5) {
            return "#D9822B"
        } else if (rating > -1) {
            return "#F55656"
        } else {
            return "#669EFF"
        }
    }
    const thisRating = (rating) => {
        if (rating > -1) {
            return (rating).toFixed(1)
        } else {
            return "No Ratings"
        }
    }
    return (
        <div
            className="resultItem"
            style={{
                width: "49%",
                height: "150px",
                padding: "10px",
                backgroundImage: "url('" + props.venue.photoSrc[0] + "')",
                cursor: "pointer",
                position: "relative"
            }}
            onClick={() => {
                props.store.dispatch(VISITED_VENUE(props.venue, props.venue.id))

            }}
        >
            <span
                style={{
                    color: "white",
                    background: "#0732a2",
                    padding: "4px 4px 8px 4px",
                    position: "absolute",
                    top: "12px",
                    left: "0",
                    textAlign: "center",
                    width: "100%"
                }}
            >
                {props.venue.name}
            </span>
            <span
                style={{
                    color: "white",
                    background: bgColor(props.venue.rating),
                    position: "absolute",
                    padding: "7px",
                    right: "10px",
                    bottom: "10px",
                    borderRadius: "5px"
                }}
            >
                {thisRating(props.venue.rating)}
            </span>
        </div>
    )
}