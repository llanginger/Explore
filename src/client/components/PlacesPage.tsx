import * as React from "react"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { BaseReduxProps } from "../Interfaces"
import { CLOSE_SETTINGS_PAGE, CLEAR_VISITED_VENUES } from "../actions/actions"
import * as firebase from "firebase"
import styled from "styled-components"
import * as groupArray from "group-array"

interface PlacesProps extends BaseReduxProps {
    onClick: any;
}

export const PlacesPage = (props: PlacesProps) => {

    const venues = props.store.getState().visitedVenues.visitedVenues
    console.log("Venues: ", venues);
    const sortedVenues = groupArray(venues, "categories.primary.name")
    console.log("Sorted venues: ", sortedVenues);



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
        background-color: white;
        height: 100%;
        width: 100%;
    `
    const List = styled.ul`
        list-style-type: none;
        height: 100%;
    `

    const Item = styled.li`
    `

    const mapVisitedVenues = () => {
        return venues.map((venue, i) => {
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
        overflow: scroll;
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
                    {mapVisitedVenues()}
                </List>
            </Container>
            <button style={{ width: "100%", color: "black" }} onClick={clearVenues}>Clear venues</button>
        </Page>

    )
}