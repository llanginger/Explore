import * as React from "react"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { BaseReduxProps, Venue, Colors } from "../Interfaces"
import { SHOW_FAVORITE, CLEAR_FAVORITES } from "../actions/actions"
import * as firebase from "firebase"
import styled from "styled-components"
import { Reusable } from "./Components"
import { createNewMarker } from "./createMarker"

interface FPProps {
    color: Colors;
    url?: string;
}


const Item: any = styled.li`
    width: 100%;
    height: 200px;
    background: ${(props: FPProps) => props.color.P_COLOR};
    margin-bottom: 10px;
    cursor: pointer;    
`


const Image: any = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background-image: url("${(props: FPProps) => props.url}");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`

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
        return () => store.dispatch(SHOW_FAVORITE(updatedVenue))
    }

    const List = styled(Reusable.MainList) `
        padding: 0px;
        background: ${colors.P_COLOR_LIGHT};

        :last-child {
            margin-bottom: 0px;
        }
    `

    const ItemName = styled.span`
        color: ${colors.PRIMARY_TEXT};
        background: ${colors.P_COLOR};
        padding: 8px 4px 8px 4px;
        position: absolute;
        top: 16px;
        left: 0;
        text-align: center;
        width: 100%;
    `

    const clearFavorites = () => {
        store.dispatch(CLEAR_FAVORITES())
    }


    const mapFavsToItems = () => {
        if (favorites.favoriteVenues.length > 0) {
            return favorites.favoriteVenues.map((venue, i) => {
                return (
                    <Item
                        color={colors}
                        key={i}
                    >
                        <Image
                            url={venue.photoSrc[0]}
                            onClick={showFavorite(venue)}
                        >
                            <ItemName>{venue.name}</ItemName>
                        </Image>
                    </Item>
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