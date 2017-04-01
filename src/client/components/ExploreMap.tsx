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
}

interface Marker {
    position: any;
    map: any;
    name?: string;
    reviews?: string[]
    rating?: number;
    addListener?: Function;
}

// --- Custom marker colors: http://stackoverflow.com/questions/7095574/google-maps-api-3-custom-marker-color-for-default-dot-marker/18623391#18623391 -- //


export class ExploreMap extends React.Component<ExploreMapProps, any> {
    private mapdiv
    public map: any
    private unsubscribe: Function;

    constructor(props) {
        super(props)
        this._loadFeatures = this._loadFeatures.bind(this)
        this._createUserPositionMarker = this._createUserPositionMarker.bind(this)
    }


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
        return new google.maps.Map(this.mapdiv, mapOptions)
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

        const currentVenue: Venue = store.getState().currentVenue
        this._loadMarkers(currentVenue, this.map)


    }

    _loadMarkers(currentVenue, map) {
        // Ensure only new markers are rendered

        if (currentVenue.name.length > 0) {
            for (var i of this.venueMarkers) {
                i.setMap(null);
            }
            this.venueMarkers = []
            navigator.geolocation.getCurrentPosition(this._createUserPositionMarker, e => console.log(e))
            let marker: Marker = this._createMarker(currentVenue, map)

            // Click func to open/close infowindows
            marker.addListener("click", function () {
                console.log(marker.name);
            });

            this.venueMarkers.push(marker)

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
        console.log("pointval: ", pointval);
        console.log("User position: ", lat + " " + lng);
        return new google.maps.Marker({
            position: pointval,
            map: this.map,
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        })
        // return "something";
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
        console.log("Create marker: ", marker)
        map.panTo(marker.getPosition())
        return marker
    }


    render() {
        this._loadFeatures()
        return <div
            style={this.props.styles}
            className="NpsForecastMap"
            ref={(mapdiv) => this.mapdiv = mapdiv}
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
