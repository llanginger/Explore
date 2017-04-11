import * as GoogleMapsLoader from "google-maps"
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import * as React from "react"
import { BaseReduxProps, Venue } from "../Interfaces"
import { BLUR_INPUT, BLUR_GPS, MAP_LOADED } from "../actions/actions"


interface ExploreMapProps extends BaseReduxProps {
    className: string;
    styles: {};
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
    private directionService
    private directionDisplay
    public map: any
    private unsubscribe: Function;

    constructor(props) {
        super(props)
        this._mapClick = this._mapClick.bind(this)
    }


    componentDidMount() {
        this.map = this._createMap()
        this.directionService = this._initDirectionService()
        this.directionDisplay = this._initDirectionRenderer()

        const { store } = this.props;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate()
        })
        console.log("Directions renderer: ", this.directionDisplay);
        store.dispatch(MAP_LOADED(this.map, this.directionService, this.directionDisplay))
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    _initDirectionService() {
        return new google.maps.DirectionsService()
    }
    _initDirectionRenderer() {
        return new google.maps.DirectionsRenderer({
            map: this.map
        })

    }

    _createMap() {
        let mapOptions = {
            zoom: 13,
            center: this._mapCenter([51.5073509,
                -0.12775829999998223]),
            disableDefaultUI: true
        }

        const thisMap = new google.maps.Map(this.mapdiv, mapOptions)

        return thisMap
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