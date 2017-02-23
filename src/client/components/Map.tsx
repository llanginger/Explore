import * as GoogleMapsLoader from "google-maps"
import * as React from "react"
import * as axios from "axios"


export class NpsForecastMap extends React.Component<any, any> {

	public map: any

	constructor(props) {
		super(props)
	}

	state = {
		forecast: []
	};


	markers = [];

	render() {
		return <div
			style={ this.props.styles }
			className="NpsForecastMap"
			ref="mapdiv"
		></div>
	}

	componentDidMount() {
		this.map = this._createMap()
		this._loadFeatures()
	}

	_createMap() {
		let mapOptions = {
			zoom: 3,
			center: this._mapCenter(),
			disableDefaultUI: true
		}
		return new google.maps.Map(this.refs.mapdiv, mapOptions)
	}

	_mapCenter() {
		return new google.maps.LatLng(
			this.props.init_lat,
			this.props.init_lng
		)
	}

	_loadFeatures() {
		let self = this
		let infoWindow = new google.maps.InfoWindow()
		axios.get(self.props.nps_source)
			.then((result: any) => {
				for (let val of result.data.features) {
					let marker = self._createMarker(val, self.map)
					marker.addListener("click", function() {
						infoWindow.close()
						let title = this.title
						let infoContent = ""
						let getWeather = false

						if (title in self.state.forecast) {
							console.log("title in state")
							infoContent = title + "<br>" + self.state.forecast[title]
						} else {
							infoContent = title + "<br>Loading Current Weather..."
							getWeather = true
						}
						infoWindow.setContent(infoContent)
						infoWindow.open(self.map, this)

						if (getWeather) {
							self._getForecast(marker.position.lat(), marker.position.lng())
								.then((result) => {
									infoWindow.setContent(title + "<br>" + result)
									self.state.forecast[title] = result
									console.log("Added forcast to state for " + title)
								})
						}
					});

					self.markers.push(marker)
				}
			})
	}

	_createMarker(val, map) {
		let pointval = new google.maps.LatLng(
			parseFloat(val["geometry"]["coordinates"][1]),
			parseFloat(val["geometry"]["coordinates"][0])
		)
		let titleText = val["properties"]["title"]
		let marker = new google.maps.Marker({
			position: pointval,
			map: map,
			title: titleText
		})

		return marker
	}

	_getForecast(lat, lng) {
		let forecast_p = new Promise(
			(resolve, reject) => {
				let request_url = "https://crossorigin.me/https://api.darksky.net/forecast/8266ff95ef9bbfccf0ea24c325818f31/"

				request_url = request_url + lat + "," + lng
				axios.get(request_url)
					.then(function(result: any) {
						let content = result.data.daily.summary
						resolve(content)
					})
			})
		forecast_p.then(
			(result) => {
				return result
			}
		)
		return forecast_p
	}
}

let init_lng = -98.5795
let init_lat = 39.8282
let nps_url = "https://raw.githubusercontent.com/gizm00/blog_code/master/appendto/react_nps/np.geojson"
