import * as React from "react"
import { Venue, BaseReduxProps } from "../Interfaces"
import { VISITED_VENUE } from "../actions/actions"
import styled from "styled-components";

interface ResultItemProps extends BaseReduxProps {
    venue: Venue
}


export const ResultItem = (props: ResultItemProps) => {

    const photoUrl = () => {
        if (props.venue.photoSrc[0] === "No image here!") {
            return "./elements/photos/noPhotos.png"
        } else {
            return props.venue.photoSrc[0];
        }
    }

    const bgColor = () => {
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

    const Item = styled.div`
        width: 49%;
        height: 150px;
        padding: 10px;
        background-image: url("${photoUrl()}");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
        position: relative;

        @media(min-width: 700px) {
            height: 200px;
        }
    `

    const ItemName = styled.span`
        color: white;
        background: #0732a2;
        padding: 4px 4px 8px 4px;
        position: absolute;
        top: 12px;
        left: 0;
        text-align: center;
        width: 100%;
    `

    const ItemRating = styled.span`
        color: white;
        background: ${bgColor()};
        position: absolute;
        padding: 7px;
        right: 10px;
        bottom: 10px;
        border-radius: 5px;
    `


    return (
        <Item
            className="resultItem"
            onClick={() => {
                props.store.dispatch(VISITED_VENUE(props.venue, props.venue.id))

            }}
        >
            <ItemName>
                {props.venue.name}
            </ItemName>
            <ItemRating>
                {thisRating(props.venue.rating)}
            </ItemRating>
        </Item>
    )
}