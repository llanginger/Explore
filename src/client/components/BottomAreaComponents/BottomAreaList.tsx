import * as React from "react"
import { Reusable } from "./../Components"
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../../actions/actions"
import styled from "styled-components"
import { BaseReduxProps, Venue, Colors } from "../../Interfaces"

interface BottomAreaListProps extends BaseReduxProps {
    venue: Venue;
    topBarOnclick: any;
    bottomButtonOnClick: any;
    bottomButtonText: string;
    colors: Colors;

}

interface PPProps {
    color: Colors;
    favorite?: boolean
}


export const BottomAreaList = (props: BottomAreaListProps) => {

    const { store, venue, colors } = props
    const favoriteIds = store.getState().favorites.favoriteVenues.favoriteIds

    const HeartIcon: any = styled(Reusable.RightElem) `
        color: ${(props: PPProps) => props.favorite ? "#F44336" : props.color.P_COLOR_LIGHT};
        text-shadow: ${(props: PPProps) => props.favorite ? "none" : "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"};
        font-size: 30px;
    `

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

    const isFavorite = (id: string) => {
        if (favoriteIds.indexOf(id) !== -1) {
            return true
        } else {
            return false
        }
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

    const rightElemOptions = {
        class: "pt-icon-heart",
    }

    const favVenue = (venue: Venue) => {
        if (favoriteIds.indexOf(venue.id) !== -1) {
            return () => {
                console.log("Removing: ", venue);
                store.dispatch(REMOVE_FROM_FAVORITES(venue))
            }
        } else {
            return () => store.dispatch(ADD_TO_FAVORITES(venue))
        }
    }
    const rightElement = (
        <HeartIcon
            className="pt-icon-heart"
            color={colors}
            onClick={favVenue(venue)}
            favorite={isFavorite(venue.id)}
        />
    )

    return (
        <ReviewContainer>
            <Reusable.TopBar
                onClick={props.topBarOnclick}
                text={props.venue.name + " reviews:"}
                rightElement={rightElement}
            />
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