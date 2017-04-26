import * as React from "react"
import { Venue, BaseReduxProps } from "../Interfaces"
import { VISITED_VENUE } from "../actions/actions"
import styled from "styled-components";
import { VenueTitleBar, DirectionButton, VenueImage, VenueRating } from "./venueComponents"

interface ResultItemProps extends BaseReduxProps {
    venue: Venue
}


export const ResultItem = (props: ResultItemProps) => {

    const colors = props.store.getState().colors
    const { venue } = props
    const photoUrl = () => {
        if (props.venue.photoSrc[0] === "No image here!") {
            return "./elements/photos/noPhotos.png"
        } else {
            return props.venue.photoSrc[0];
        }
    }

    const badgeColor = () => {
        if (props.venue.rating > 6.9) {
            return "#0F9960"
        } else if (props.venue.rating > 3.5) {
            return "#D9822B"
        } else if (props.venue.rating > -1) {
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

    const visitedVenue = (venue, id) => {
        return () => props.store.dispatch(VISITED_VENUE(venue, id))
    }


    return (
        <VenueImage
            color={colors}
            url={photoUrl()}
            width="49%"
            height="200px"
            className="resultItem"
        >

            <VenueTitleBar
                color={colors}
                venueName={props.venue.name}
                onClick={visitedVenue(venue, venue.id)}
                fontSize="14px"
            />

            <VenueRating
                textColor={colors}
                ratingColor={badgeColor()}
            >
                {thisRating(props.venue.rating)}
            </VenueRating>
        </VenueImage>
    )
}