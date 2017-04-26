import * as React from "react"
import styled from "styled-components"
import { Colors } from "../../Interfaces"
import * as P from "polished"

interface VenueRatingProps {
    textColor: Colors;
    ratingColor: string;
    top?: string;
    bottom?: string;
    right?: string;
    left?: string;
    children?: any;
}

const ItemRating: any = styled.span`
    color: ${(props: VenueRatingProps) => props.textColor.PRIMARY_TEXT};
    background: ${(props: VenueRatingProps) => props.ratingColor};
    position: absolute;
    padding: 7px;
    top: ${(props: VenueRatingProps) => props.top};
    bottom: ${(props: VenueRatingProps) => props.bottom};
    right: ${(props: VenueRatingProps) => props.right};
    left: ${(props: VenueRatingProps) => props.left};
    border-radius: 5px;
`

export const VenueRating = (props: VenueRatingProps) => {
    const {
        textColor,
        ratingColor,
        top = "auto",
        bottom = "10px",
        right = "10px",
        left = "auto"
    } = props

    return (
        <ItemRating
            textColor={textColor}
            ratingColor={ratingColor}
            top={top}
            bottom={bottom}
            right={right}
            left={left}
        >
            {props.children}
        </ItemRating>
    )
}