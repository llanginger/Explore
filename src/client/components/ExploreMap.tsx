import * as GoogleMapsLoader from "google-maps"
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import * as React from "react"
import { BaseReduxProps, Venue } from "../Interfaces"
import { BLUR_INPUT, BLUR_GPS } from "../actions/actions"
import { Map } from "./Components"


interface ExploreMapProps extends BaseReduxProps {
    className: string;
    styles: {};
    init_lat: number;
    init_lng: number;
}

interface Marker {
    position: any;
    map: any;
    name?: string;
    reviews?: string[]
    rating?: number;
    addListener?: Function;
}


export class ExploreMap extends React.Component<ExploreMapProps, any> {
    private mapdiv
    public map: any
    private unsubscribe: Function;

    constructor(props) {
        super(props)
        this._createUserPositionMarker = this._createUserPositionMarker.bind(this)
        this._mapClick = this._mapClick.bind(this)
    }


    componentDidMount() {
        this.map = this._createMap()
        const { store } = this.props;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate()
        })
        store.dispatch({ type: "MAP_LOADED", mapRef: this.map })
        navigator.geolocation.getCurrentPosition(this._createUserPositionMarker, e => console.log(e))
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    _createMap() {
        let mapOptions = {
            zoom: 13,
            center: this._mapCenter(),
            disableDefaultUI: true
        }
        return new google.maps.Map(this.mapdiv, mapOptions)
    }

    _mapCenter() {
        return new google.maps.LatLng(
            47.625058,
            -122.337680
        )
    }
    _mapClick() {
        if (this.props.store.getState().homeInputState.active === true) {
            if (this.props.store.getState().homeInputState.isInGPSMode === true) {
                this.props.store.dispatch(BLUR_GPS())
            } else {

                this.props.store.dispatch(BLUR_INPUT())
            }
        } else {
            return
        }
    }
    _createUserPositionMarker(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        let pointval = new google.maps.LatLng(
            parseFloat(lat.toString()),
            parseFloat(lng.toString())
        )
        // console.log("pointval: ", pointval);
        // console.log("User position: ", lat + " " + lng);
        return new google.maps.Marker({
            position: pointval,
            map: this.map,
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        })
        // return "something";
    }



    render() {
        // this._loadFeatures()
        const { store } = this.props

        return (
            <div
                onClick={this._mapClick}
                style={this.props.styles}
                className="ExploreMap"
                ref={(mapdiv) => this.mapdiv = mapdiv}
            ></div>
        )
    }
}