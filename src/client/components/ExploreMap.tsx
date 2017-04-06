import * as GoogleMapsLoader from "google-maps"
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import * as React from "react"
import { BaseReduxProps, Venue } from "../Interfaces"
import { BLUR_INPUT, BLUR_GPS } from "../actions/actions"


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
        this._mapClick = this._mapClick.bind(this)
    }


    componentDidMount() {
        this.map = this._createMap()
        const { store } = this.props;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate()
        })
        store.dispatch({ type: "MAP_LOADED", mapRef: this.map })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    _createMap() {
        let mapOptions = {
            zoom: 13,
            center: this._mapCenter([51.5073509,
                -0.12775829999998223]),
            disableDefaultUI: true
        }
        return new google.maps.Map(this.mapdiv, mapOptions)
    }

    _mapCenter(gps) {
        return new google.maps.LatLng(
            gps[0],
            gps[1]
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




    render() {
        const { store } = this.props

        return (
            <div
                onClick={this._mapClick}
                style={this.props.styles}
                className="ExploreMap"
                ref={(mapdiv) => this.mapdiv = mapdiv}
            >
            </div>
        )
    }
}