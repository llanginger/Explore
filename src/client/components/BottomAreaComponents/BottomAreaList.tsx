import * as React from "react"
import { Reusable } from "./../Components"
import styled from "styled-components"
import { Venue, Colors } from "../../Interfaces"

interface BottomAreaListProps {
    venue: Venue;
    topBarOnclick: any;
    bottomButtonOnClick: any;
    bottomButtonText: string;
    colors: Colors;
}

export const BottomAreaList = (props: BottomAreaListProps) => {

    const colors = props.colors
    const mapReviewsToList = () => {
        let reviews = [...props.venue.reviews]
        if (reviews.length > 15) {
            reviews = reviews.slice(0, 15)
        }
        return reviews.map((rev, i) => {
            return (
                <ListItem
                    key={i}
                >
                    {rev}
                </ListItem>
            )
        })
    }

    const ListItem = styled.li`
        border-bottom: 1px solid ${colors.DIVIDER};
        margin-bottom: 10px;
        padding: 10px;
        background-color: ${colors.P_COLOR_LIGHT};
        font-size: 16px;
        color: ${colors.SECONDARY_TEXT}
    `

    const ReviewContainer = styled.div`
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
    `

    const ReviewList = styled.ul`
        background: white;
        width: 100%;
        margin: 0px;
        height: 100%;
        padding: 10px 10px 0px 10px;
        list-style-type: none;
        overflow-y: scroll;

    `

    return (
        <ReviewContainer>
            <Reusable.TopBar
                onClick={props.topBarOnclick}
                text={props.venue.name + " reviews:"} />
            <ReviewList>
                {mapReviewsToList()}
            </ReviewList>
            <Reusable.BottomButton
                onClick={props.bottomButtonOnClick}
                text={props.bottomButtonText}
            />
        </ReviewContainer>
    )

}