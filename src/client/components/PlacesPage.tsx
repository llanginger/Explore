import * as React from "react"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { BaseReduxProps, Venue, Colors } from "../Interfaces"
import { CLOSE_SETTINGS_PAGE, CLEAR_VISITED_VENUES, ADD_TO_FAVORITES } from "../actions/actions"
import * as firebase from "firebase"
import styled from "styled-components"
import * as groupArray from "group-array"
import * as _ from "underscore"
import { Reusable } from "./Components"

interface PPProps {
    color: Colors;
    favorite?: boolean
}

const CategoryList: any = styled.ul`
    list-style-type: none;
    background-color: ${(props: PPProps) => props.color.P_COLOR_LIGHT};
    padding-left: 0px;
`

const HeaderItem: any = styled.li`
    padding: 10px;
    margin-bottom: 5px;
    color: ${(props: PPProps) => props.color.SECONDARY_TEXT};
    display: flex;
    justify-content: space-between;
    transition: all .06s linear;
    cursor: pointer;

    &:hover {
        background: ${(props: PPProps) => props.color.ACCENT};
        color: ${(props: PPProps) => props.color.PRIMARY_TEXT};
    }

    &:hover > span {
        color: white;
        color: ${(props: PPProps) => props.color.ICONS};
    }
`

const Item: any = styled.li`
    padding: 10px;
    display: flex;
    color: ${(props: PPProps) => props.color.MEDIUM_TEXT};
    justify-content: space-between;
    transition: all .06s linear;
    cursor: pointer;

    &:hover {
        background: ${(props: PPProps) => props.color.P_COLOR};
        color: ${(props: PPProps) => props.color.PRIMARY_TEXT};
    }
`

const HeartIcon: any = styled.span`
    color: ${(props: PPProps) => props.favorite ? "#F44336" : props.color.P_COLOR_LIGHT};
    text-shadow: ${(props: PPProps) => props.favorite ? "none" : "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"};
    &:hover {
        color: #F44336;
        text-shadow: none;
    }
`

const CloseIcon: any = styled.span`
    color: ${(props: PPProps) => props.color.SECONDARY_TEXT};
`

const Span: any = styled.span`
    color: ${(props: PPProps) => props.color.ICONS};
    font-size: 20px;
    cursor: pointer;
`


interface PlacesProps extends BaseReduxProps {
    onClick: any;
}

interface SortedVenues {
    [key: string]: Venue[] | any;
}

export const PlacesPage = (props: PlacesProps) => {
    const { store } = props
    const venues = store.getState().visitedVenues.visitedVenues
    const colors = store.getState().colors
    const sortedVenues: SortedVenues = groupArray(venues, "categories.primary.name")
    console.log("Unsorted venues: ", venues);
    console.log("Sorted venues: ", sortedVenues);

    _.each(sortedVenues, (value, key) => {
        console.log("underscore value: ", value)
        console.log("underscore key: ", key)
    })

    const favVenue = (venue: Venue) => {
        return () => store.dispatch(ADD_TO_FAVORITES(venue))
    }


    const makeLists = () => {
        let renderArray = []
        _.each(sortedVenues, (venues, key) => {
            renderArray.push(
                <CategoryList
                    key={key}
                    color={colors}
                >
                    <HeaderItem
                        key={venues}
                        color={colors}
                    >
                        {key}
                        <CloseIcon
                            className="pt-icon-large pt-icon-cross"
                            color={colors}
                        />
                    </HeaderItem>
                    {mapVisitedVenues(venues)}
                </CategoryList>
            )
        });
        return renderArray
    }

    const mapVisitedVenues = (venueList: Venue[]) => {
        return venueList.map((venue, i) => {
            return (
                <Item
                    key={i}
                    color={colors}
                >
                    {venue.name}
                    <HeartIcon
                        className="pt-icon-large pt-icon-heart"
                        color={colors}
                        onClick={favVenue(venue)}
                        favorite={true}
                    />
                </Item>
            )
        })
    }

    const clearVenues = (e) => {
        props.store.dispatch(CLEAR_VISITED_VENUES())
        e.stopPropagation()
    }

    return (

        <Reusable.Page
            className="accountPage"
        >
            <Reusable.TopBar
                onClick={props.onClick}
                text="Visited Venues"
            />
            <Reusable.MainList>
                {makeLists()}
            </Reusable.MainList>
            <Reusable.BottomButton onClick={clearVenues} text="Clear Venues" />
        </Reusable.Page>

    )
}


// Rip out venue objects, only need ids