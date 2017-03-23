import * as GoogleMapsLoader from "google-maps"
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import * as React from "react"
import * as axios from "axios"
import { BaseReduxProps, Venue } from "../Interfaces"
import { } from "../actions/actions"

interface ExploreMapProps extends BaseReduxProps {
    className: string;
    styles: {};
    init_lat: number;
    init_lng: number;
    nps_source: string
}

interface Marker {
    position: any;
    map: any;
    name: string;
    reviews: string[]
    rating: number;
    addListener: Function;
}

export class ExploreMap extends React.Component<ExploreMapProps, any> {

    public map: any
    private unsubscribe: Function;

    constructor(props) {
        super(props)
        this._loadFeatures = this._loadFeatures.bind(this)
    }
    state = {
        forecast: []
    };

    markers = [];

    componentDidMount() {
        this.map = this._createMap()
        this._loadFeatures()
        const { store } = this.props;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate()
        })
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
        return new google.maps.Map(this.refs.mapdiv, mapOptions)
    }

    _mapCenter() {
        return new google.maps.LatLng(
            47.625058,
            -122.337680
        )
    }

    // Inelegant atm - created markers are pushed to this array which is emptied on new marker props
    venueMarkers = []

    _loadFeatures() {
        const props = this.props
        const { store } = props
        let self = this

        const venues = store.getState().currentResults.venues
        this._loadMarkers(venues, this.map)


    }

    _loadMarkers(venues, map) {
        const venuesToMark = [...venues]

        // Ensure only new markers are rendered
        if (venuesToMark.length !== this.venueMarkers.length) {
            for (var i of this.venueMarkers) {
                i.setMap(null);
            }
            this.venueMarkers = []
            for (let val of venuesToMark) {

                let marker: Marker = this._createMarker(val, map)

                // Click func to open/close infowindows
                marker.addListener("click", function () {
                    console.log(marker.name);
                });

                this.venueMarkers.push(marker)
            }
        } else {
            return
        }
    }

    _createMarker(val: Venue, map) {
        let pointval = new google.maps.LatLng(
            parseFloat(val.location.lat.toString()),
            parseFloat(val.location.lng.toString())
        )
        let marker = new google.maps.Marker({
            position: pointval,
            map: map,
            name: val.name,
            rating: val.rating.toFixed(0),
            reviews: val.reviews
        })

        return marker
    }


    render() {
        this._loadFeatures()
        return <div
            style={this.props.styles}
            className="NpsForecastMap"
            ref="mapdiv"
        ></div>
    }
}










































/*export class ExploreMap extends React.Component<ExploreMapProps, any> {

	private map: any
	private unsubscribe: Function;

	constructor(props) {
		super(props)
	}

	shouldComponentUpdate(nextProps, nextState) {
		return false
	}

	componentDidMount() {
		const { store } = this.props
		this.unsubscribe = store.subscribe(() => {
			this.forceUpdate();
		})
	}

	componentWillUnmount() {
		this.unsubscribe()
	}

	renderGoogleMap() {
		const key = "Yosemite Valley";
		const lat = 37.8651;
		const lng = 119.5383; 
		const markers = [{
		position: {
			lat,
			lng,
		},
		key,
		defaultAnimation: 2,
		infoContent: (
			<div>
				<div>
				I am an infoWindow!
				</div>
			</div>
			)
		}];

		const GettingStartedGoogleMap = withGoogleMap(props => (
		<GoogleMap
			ref={props.onMapLoad}
			onClick={props.onMapClick}
			options={{
			zoom: 6,
			center: { lat, lng },
			disableDefaultUI: true
			}}
		>
			{props.markers.map(marker => (
			<Marker
			{...marker}
			onClick={() =>{
				console.log(marker.key);
			}}
			onRightClick={() => props.onMarkerRightClick(marker)}
			>
			<InfoWindow>
				<div>{marker.infoContent}</div>
			</InfoWindow>
			</Marker>
		))}
		</GoogleMap>
		));

		return (
			<GettingStartedGoogleMap
			containerElement={
			<div style={{ height: "100%", width: "100%" }} />
			}
			mapElement={
				<div style={{ height: '100%' }} />
			}
			onMapLoad={this.handleMapLoad}
			onMapClick={() => {
				console.log("Mapp clicked");
			}}
			markers={markers}
			onMarkerRightClick={this.handleMarkerRightClick}
			/>
		);
	}
	render() {
		return (
			<div
				style={this.props.styles}
			>
				{this.renderGoogleMap()}
			</div>
		);
	}
	
}*/
