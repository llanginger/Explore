import * as React from "react"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { BaseReduxProps, Venue } from "../Interfaces"
import { CLOSE_SETTINGS_PAGE, CLEAR_VISITED_VENUES } from "../actions/actions"
import * as firebase from "firebase"
import styled from "styled-components"
import * as groupArray from "group-array"
import * as _ from "underscore"
import { Reusable } from "./Components"

interface PlacesProps extends BaseReduxProps {
    onClick: any;
}

interface SortedVenues {
    [key: string]: Venue[] | any;
}

export const PlacesPage = (props: PlacesProps) => {

    const venues = props.store.getState().visitedVenues.visitedVenues
    const sortedVenues: SortedVenues = groupArray(venues, "categories.primary.name")
    console.log("Sorted venues: ", sortedVenues);

    _.each(sortedVenues, (value, key) => {
        console.log("underscore value: ", value)
    })

    const CategoryList = styled.ul`
        list-style-type: none;
        background-color: white;
        padding: 5px 10px;
        border-bottom: 1px solid #666;
    `

    const Item = styled.li`
    `

    const HeaderItem = styled.li`
        margin-bottom: 5px;
        color: #B10DC9;
    `

    const Span = styled.span`
        color: white;
        font-size: 20px;
        cursor: pointer;
    `

    const makeLists = () => {
        let renderArray = []
        _.each(sortedVenues, (value, key) => {
            renderArray.push(
                <CategoryList key={key}>
                    <HeaderItem
                        key={value}
                    >
                        {key}
                    </HeaderItem>
                    {mapVisitedVenues(value)}
                </CategoryList>
            )
        });
        return renderArray
    }

    const mapVisitedVenues = (venueList: Venue[]) => {
        return venueList.map((venue, i) => {
            return <Item key={i}>{venue.name}</Item>
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
            <Reusable.TopBar onClick={props.onClick} text="Visited Venues" />
            <Reusable.MainList>
                {makeLists()}
            </Reusable.MainList>
            <Reusable.BottomButton onClick={clearVenues} text="Clear Venues" />
        </Reusable.Page>

    )
}


// Rip out venue objects, only need ids