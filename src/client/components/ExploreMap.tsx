import * as GoogleMapsLoader from "google-maps"
import * as React from "react"
import * as axios from "axios"
import { BaseReduxProps, Venue } from "../Interfaces"

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
		for (var i of this.venueMarkers) {
          i.setMap(null);
        }
		const props = this.props
		const { store } = props

		// temp venue data:
		const venues = store.getState()
		let self = this
		let infoWindow = new google.maps.InfoWindow()



		const venuesToMark = [...store.getState().currentResults.results]
		for (let val of venuesToMark) {

			let marker: Marker = self._createMarker(val, self.map)

			// Click func to open/close infowindows
			marker.addListener("click", function() {
				
				infoWindow.close()
				const infoContent = '<div class="red">' + marker.name + "<br>" + this.reviews[0] + '</div>'
			
				// infoWindow.setContent(infoContent)
				infoWindow.setOptions({
					content: infoContent,
					maxWidth: 200
				})
				infoWindow.open(self.map, this)

			});

			this.venueMarkers.push(marker)
		}
	}

	_createMarker(val: Venue, map) {
		let pointval = new google.maps.LatLng(
			parseFloat(val.lat.toString()),
			parseFloat(val.lng.toString())
		)
		let marker = new google.maps.Marker({
			position: pointval,
			map: map,
			name: val.name,
			reviews: val.reviews
		})

		return marker
	}


	render() {
		this._loadFeatures()
		return <div
			style={ this.props.styles }
			className="NpsForecastMap"
			ref="mapdiv"
		></div>
	}
}

