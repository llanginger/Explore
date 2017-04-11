import * as React from "react"
import { Reusable } from "./../Components"
import styled from "styled-components"
import { Venue } from "../../Interfaces"

interface BottomAreaListProps {
    venue: Venue;
    topBarOnclick: any;
    bottomButtonOnClick: any;
    bottomButtonText: string;
}

export const BottomAreaList = (props: BottomAreaListProps) => {

    const mapReviewsToList = () => {
        // Maybe turn this into a factory? Need some way of rendering only a couple
        return props.venue.reviews.slice(0, 5).map((rev, i) => {
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
        border-bottom: 1px solid #888;
        margin-bottom: 10px;
        padding-bottom: 10px;
        font-size: 16px;
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

        &::-webkit-scrollbar {
            display: none;
        }
    `

    return (
        <ReviewContainer>
            <Reusable.TopBar
                onClick={props.topBarOnclick}
                text={props.venue.name} />
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