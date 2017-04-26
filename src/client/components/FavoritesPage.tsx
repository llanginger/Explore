import * as React from "react"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { BaseReduxProps, Venue, Colors } from "../Interfaces"
import { SHOW_FAVORITE, CLEAR_FAVORITES, REMOVE_FROM_FAVORITES } from "../actions/actions"
import * as firebase from "firebase"
import styled from "styled-components"
import * as P from "polished"
import { Reusable } from "./Components"
import { DirectionButton, VenueImage, VenueTitleBar } from "./venueComponents"
import { createNewMarker } from "./createMarker"

interface FPProps {
    color: Colors;
    url?: string;
}

const Placeholder: any = styled.div`
    width: 100%;
    height: 200px;
    position: relative;
    background: ${(props: FPProps) => props.color.P_COLOR};
`

interface FavoritesPageProps extends BaseReduxProps {
    onClick: any;
}

export const FavoritesPage = (props: FavoritesPageProps) => {

    const { store } = props
    const favorites = store.getState().favorites.favoriteVenues
    const colors = store.getState().colors

    const showFavorite = (venue: Venue) => {
        const favMarker = createNewMarker(venue, null)
        const updatedVenue: Venue = {
            ...venue,
            marker: favMarker
        }
        return (e) => {
            e.preventDefault;
            store.dispatch(SHOW_FAVORITE(updatedVenue))
        }
    }

    const List = styled(Reusable.MainList) `
        padding: 0px;
        background: ${colors.P_COLOR_LIGHT};

        :last-child {
            margin-bottom: 0px;
        }
    `

    const NameBar = styled.div`
        color: ${colors.PRIMARY_TEXT};
        background: ${colors.P_COLOR};
        position: absolute;
        top: 16px;
        left: 0;
        text-align: center;
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `

    const RemoveFavorite = styled.span`
        width: 40px;
        height: 100%;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    `

    const LeftPad = styled.span`
        width: 40px;
        height: 100%;
        margin-left: 10px;
    `

    const ItemName = styled.span`
        color: white;
        font-size: 20px;
    `

    const removeFavorite = (venue) => {
        return () => {
            store.dispatch(REMOVE_FROM_FAVORITES(venue))
        }
    }

    const clearFavorites = () => {
        store.dispatch(CLEAR_FAVORITES())
    }


    const mapFavsToItems = () => {
        if (favorites.favoriteVenues.length > 0) {
            return favorites.favoriteVenues.map((venue, i) => {
                return (
                    <VenueImage
                        color={colors}
                        key={i}
                        url={venue.photoSrc[0]}
                    >
                        <VenueTitleBar
                            color={colors}
                            venueName={venue.name}
                            onClick={removeFavorite(venue)}
                        />
                        <DirectionButton
                            iconClass={"pt-icon-geolocation"}
                            color={colors}
                            onClick={showFavorite(venue)}
                        />
                    </VenueImage>
                )
            })
        } else {
            return (
                <Placeholder
                    color={colors}
                >
                    <ItemName>Go Favorite Some Places!</ItemName>
                </Placeholder>
            )
        }
    }

    return (
        <Reusable.Page>
            <Reusable.TopBar
                text="Favorites"
                onClick={props.onClick}
            />
            <List>
                {mapFavsToItems()}
            </List>
            <Reusable.BottomButton
                text="Reset Favorites"
                onClick={clearFavorites}
            />
        </Reusable.Page>
    )

}