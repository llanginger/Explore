import * as React from 'react';
import {
    InputGroup,
    Intent,
    Button
} from "@blueprintjs/core"
import { BaseReduxProps, GooglePlaces } from "../Interfaces"
import styled from "styled-components"

import { INPUT_GPS, BLUR_INPUT, FOCUS_USER_MARKER } from "../actions/actions"
import { store } from "../Store"


interface PlacesAutoState {
    inputValue: string;
    refGps: boolean;
}

interface PlacesAutoProps {
    onPlaceSelected: any;
    types?: string[];
    componentRestrictions?: {};
    bounds?: {};
}

const GPSPrompt = styled.div`
    width: 100%;
    background: white;
    color: black;
    height: 40px;
    box-sizing: border-box;
    border-bottom: 2px solid #669EFF;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
        background-color: #669EFF;
        color: white
    }

    &:hover span {
        color: white;
    }

`

const IconSpan = styled.span`
    color: #669EFF;
    margin: 0px 12px;
`

export class PlacesAuto extends React.Component<PlacesAutoProps, PlacesAutoState> {
    private unsubscribe;
    private autocomplete;
    private input;
    private gpsInput;
    static propTypes = {
        onPlaceSelected: React.PropTypes.func,
        types: React.PropTypes.array,
        componentRestrictions: React.PropTypes.object,
        bounds: React.PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.autocomplete = null;
        this._onSelected = this._onSelected.bind(this)
        this.state = { inputValue: "", refGps: true }
        this._renderGpsButton = this._renderGpsButton.bind(this)
        this._focusUserMarker = this._focusUserMarker.bind(this)
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate()
        })

        const { types = [], componentRestrictions, bounds, } = this.props;
        const config: any = {
            types,
            bounds,
        };

        if (componentRestrictions) {
            config.componentRestrictions = componentRestrictions;
        }

        this.gpsInput.focus()
        this.autocomplete = new google.maps.places.Autocomplete(this.gpsInput, config);
        this.autocomplete.addListener('place_changed', this._onSelected);

    }

    _onSelected() {
        if (this.props.onPlaceSelected) {
            const response = this.autocomplete.getPlace();
            const formattedResponse = {
                formattedAddress: response.formatted_address,
                geometry: {
                    lat: response.geometry.location.lat(),
                    lng: response.geometry.location.lng()
                },
                name: response.name,
                types: response.types ? response.types : "",
                vicinity: response.vicinity ? response.vicinity : ""
            }
            console.log("response: ", response)
            this.props.onPlaceSelected(formattedResponse);
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
        const elem = document.body.getElementsByClassName("pac-container")[0]
        document.body.removeChild(elem)
    }

    _renderGpsButton() {
        if (store.getState().userReducer.hasGps === true) {
            return <GPSPrompt onClick={this._focusUserMarker}><IconSpan className="pt-icon pt-icon-locate" />   <span>Use GPS Coordinates?</span></GPSPrompt>
        } else {
            return null
        }
    }

    _focusUserMarker() {
        const userMarker: google.maps.Marker = store.getState().userReducer.positionMarker
        store.dispatch(FOCUS_USER_MARKER(userMarker.getPosition()))
    }

    render() {
        const clearButton = () => {
            if (this.input && this.input.value.length > 0) {
                return (
                    <Button
                        iconName="pt-icon-delete"
                        onClick={(e) => {
                            this.input.value = ""
                            this.input.focus()
                            e.stopPropagation()
                        }}
                    />
                )
            }
        }

        const handleInputChange = (e) => {
            this.setState({ inputValue: e.target.value })
            e.stopPropagation()
        }



        const { onPlaceSelected, types, componentRestrictions, bounds, ...rest } = this.props;
        return (
            <div>
                <InputGroup
                    inputRef={(input) => this.gpsInput = input}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="pt-large testInput"
                    intent={Intent.SUCCESS}
                    leftIconName="pt-icon-path-search"
                    placeholder="Where are you?"
                    rightElement={clearButton()}
                    onChange={handleInputChange}
                    value={this.state.inputValue}
                    {...rest}
                />
                {this._renderGpsButton()}
            </div>
        );
    }
}
