// This needs to be a popover instead

// Todo for Tuesday: Hook up sub menu to input

import * as classNames from "classnames";
import * as React from "react"
import axios from "axios"
import { BaseReduxProps, GooglePlaces } from "../Interfaces"

import {
    Button,
    Classes,
    InputGroup,
    Intent,
    Menu,
    MenuItem,
    Popover,
    Position,
    Switch,
    Tag,
    Tooltip,
} from "@blueprintjs/core";
import { FETCHED_VENUES, FETCHING_VENUES, FOCUS_INPUT, CLEAR_VENUES, SHOW_SETTINGS_PAGE, INPUT_GPS, SET_GPS_DATA } from "../actions/actions"

import { ResultsMenu, PlacesAuto, Spinner } from "./Components"
import { createNewMarker } from "./createMarker"

import styled from "styled-components"

interface ICProps {
    inputState: boolean;
}

const InputContainer = styled.div`
    position: absolute;
    top: ${(props: ICProps) => props.inputState ? "0px" : "9%"};
    width: ${(props: ICProps) => props.inputState ? "100%" : "90%"};
    left: ${(props: ICProps) => props.inputState ? "0px" : "5%"};
    box-shadow: ${(props: ICProps) => props.inputState ? "" : "5px 5px 5px #333"};
    transition: all .3s;
    z-index: ${(props: ICProps) => props.inputState ? "11" : "0"};
`

export interface InputGroupState {
    disabled?: boolean;
    filterValue?: string;
    large?: boolean;
    showPassword?: boolean;
    tagValue?: string;
}

interface InputProps extends BaseReduxProps {
    placeholder: string;
    style: {}
}

interface HomeInputState {
    category: string;
    limit: number;
    inputActive: boolean;
}

export class HomeInput extends React.Component<InputProps, HomeInputState> {
    private unsubscribe: Function;
    private homeInput: HTMLElement

    constructor(props) {
        super(props);
        this.state = {
            category: "",
            limit: 40,
            inputActive: false
        }

        this._queryFourSquare = this._queryFourSquare.bind(this)
    }

    _queryFourSquare(gps) {
        const { store } = this.props
        const params = {
            params: {
                category: this.state.category,
                lat: gps.lat,
                lng: gps.lng,
                limit: this.state.limit
            }
        }
        store.dispatch(FETCHING_VENUES())
        axios.get("queryFourSquare", params)
            .then((response) => {
                let updatedVenues = []

                for (let venue of response.data) {
                    updatedVenues.push({
                        ...venue,
                        marker: createNewMarker(venue, null)
                    })
                }
                console.log("Updated venues: ", updatedVenues);
                console.log("Home Input response: ", response)
                this.props.store.dispatch(FETCHED_VENUES(
                    updatedVenues,
                    store.getState().visitedVenues.visitedIds,
                    params.params
                ))
            })
    }

    componentDidMount() {
        const { store } = this.props;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate()
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    render() {
        const props = this.props
        const state = this.state
        const { store } = props
        const { category } = state
        const inputState = store.getState().homeInputState.active
        const spinnerState = store.getState().spinner.searchResultsSpinner
        const gps = store.getState().gps.geometry
        const currentVenue = store.getState().currentVenue

        const handleInputChange = (event) => {
            this.setState({ category: event.target.value })
            // console.log(state)
            // console.log({thing1: "thing1", thing2: "thing2"})
        }
        const formatString = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1)
        }
        const handleKeyDown = (event) => {
            if (event.keyCode === 13) {
                this.setState({ category: formatString(this.state.category) })
                this._queryFourSquare(gps)
            }
        }

        const handleInputClick = () => {

            if (this.state.inputActive === false) {
                store.dispatch(FOCUS_INPUT())
            } else {
                return
            }
        }

        const clearButton = () => {
            if (this.state.category.length > 0) {
                return (
                    <Button
                        iconName="pt-icon-delete"
                        onClick={() => {
                            this.setState({ category: "" })
                            store.dispatch(CLEAR_VENUES())
                            this.homeInput.focus()
                        }}
                    />
                )
            }
        }

        const gpsButton = () => {
            return (
                <Button
                    iconName="pt-icon-globe"
                    onClick={() => {
                        this.setState({ category: "" })
                        store.dispatch(INPUT_GPS(currentVenue.marker))
                    }}
                />
            )
        }

        const chooseRightElement = () => {
            if (inputState === true) {
                return clearButton()
            } else {
                return gpsButton()
            }
        }

        const displaySpinner = () => {
            if (spinnerState === true) {
                return (
                    <Spinner
                        className={"centerAbsolute marginTop50P pt-large"}
                    />
                )
            } else {
                return
            }
        }

        const venueOrGps = () => {
            if (store.getState().homeInputState.isInGPSMode === true) {
                return (
                    <InputContainer
                        inputState={inputState}
                    >
                        <PlacesAuto
                            onPlaceSelected={(place) => {
                                console.log("PlacesAuto response object", place)
                                const mapRef = store.getState().map.mapRef as google.maps.Map
                                mapRef.setCenter({ lat: place.geometry.lat, lng: place.geometry.lng })
                                store.dispatch(SET_GPS_DATA(place))
                            }}
                        />
                    </InputContainer>
                )
            } else {
                return (

                    <InputContainer
                        inputState={inputState}
                    >
                        <InputGroup
                            className="pt-large testInput"
                            onClick={handleInputClick}
                            intent={Intent.PRIMARY}
                            leftIconName="pt-icon-search"
                            rightElement={chooseRightElement()}
                            inputRef={(input) => this.homeInput = input}
                            placeholder={props.placeholder}
                            value={state.category}
                            disabled={false}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <ResultsMenu store={store} />
                        {displaySpinner()}
                    </InputContainer>
                )
            }
        }

        return (
            <div>
                {venueOrGps()}
            </div>
        )
    }


}











