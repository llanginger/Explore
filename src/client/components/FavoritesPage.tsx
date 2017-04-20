import * as React from "react"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { BaseReduxProps, Venue, Colors } from "../Interfaces"
import * as firebase from "firebase"
import styled from "styled-components"
import { Reusable } from "./Components"

interface FPProps {
    color: Colors;
    url?: string;
}


const Item: any = styled.li`
    width: 100%;
    height: 200px;
    background: ${(props: FPProps) => props.color.P_COLOR};
    margin-bottom: 10px;

    
`

const Image: any = styled.div`
    width: 100%;
    height: 100%;
    background-image: url("${(props: FPProps) => props.url}");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`


interface FavoritesPageProps extends BaseReduxProps {
    onClick: any;
}

export const FavoritesPage = (props: FavoritesPageProps) => {

    const List = styled(Reusable.MainList) `
        padding-top: 0px;

        :last-child {
            margin-bottom: 0px;
        }
    `
    const { store } = props
    const favorites = store.getState().favorites.favoriteVenues
    const colors = store.getState().colors

    const mapFavsToItems = () => {
        if (favorites.favoriteVenues.length > 0 && !favorites.favoriteVenues[0].placeholder) {
            return favorites.favoriteVenues.map((venue, i) => {
                return (
                    <Item
                        color={colors}
                        key={i}
                    >
                        <Image url={venue.photoSrc[0]} />
                    </Item>
                )
            })
        } else {
            return <p>Go Favorite Some Places!</p>
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
                text="Do Something"
                onClick={() => console.log("Clicked Favorites Button")}
            />
        </Reusable.Page>
    )

}