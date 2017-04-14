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
        padding-left: 10px;
        border-bottom: 1px solid #888;
    `

    const Item = styled.li`
        padding: 10px;
        display: flex;
        justify-content: space-between;
        transition: all .06s linear;
        cursor: pointer;

        &:hover {
            background: #669EFF;
            color: white;
        }
    `
    const HeaderItem = styled.li`
        padding: 10px;
        margin-bottom: 5px;
        color: #B10DC9;
        display: flex;
        justify-content: space-between;
        transition: all .06s linear;
        cursor: pointer;

        &:hover {
            background: black;
            color: white;
        }

        &:hover > span {
            color: white;
        }
    `

    const HeartIcon = styled.span`
        color: white;
        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
        &:hover {
            color: pink;
            text-shadow: none;
        }
    `

    const CloseIcon = styled.span`
        color: black;
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
                        <CloseIcon className="pt-icon-large pt-icon-cross" />
                    </HeaderItem>
                    {mapVisitedVenues(value)}
                </CategoryList>
            )
        });
        return renderArray
    }

    const mapVisitedVenues = (venueList: Venue[]) => {
        return venueList.map((venue, i) => {
            return <Item key={i}>{venue.name}<HeartIcon className="pt-icon-large pt-icon-heart" /></Item>
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