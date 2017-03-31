import * as React from "react"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { BaseReduxProps, Venue } from "../Interfaces"
import { CLOSE_SETTINGS_PAGE, CLEAR_VISITED_VENUES } from "../actions/actions"
import * as firebase from "firebase"
import styled from "styled-components"
import * as groupArray from "group-array"
import * as _ from "underscore"

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




    const basicStyles = {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bottom: "0px",
        left: "0px"
    }

    const Page = styled.div`
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 0px;
        left: 0px;
        background-color: palevioletred;
        height: 100%;
        width: 100%;
    `
    const List = styled.ul`
        list-style-type: none;
        width: 100%;
        height: 70%;
        margin-bottom: 5px;
        overflowY: scroll;
        background-color: white;
    `

    const Item = styled.li`
    `

    const makeLists = () => {
        let renderArray = []
        _.each(sortedVenues, (value, key) => {
            renderArray.push(
                <ul>
                    <Item style={{ color: "pink" }}>{key}</Item>
                    {mapVisitedVenues(value)}
                </ul>
            )
        });
        return renderArray.map((venue) => {
            return venue
        })

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

    const containerStyles = {
        width: "90%"
    }

    const Container = styled.div`
        height: 60%;
        width: 90%;
        position: relative;
    `

    return (

        <Page
            className="accountPage"
            onClick={props.onClick}
        >
            <Container
                className="formContainer"
                style={containerStyles}
            >
                <List>
                    {makeLists()}
                </List>
                <button style={{ width: "100%", color: "black" }} onClick={clearVenues}>Clear venues</button>
            </Container>
        </Page>

    )
}