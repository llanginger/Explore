import * as React from "react"
import { BaseReduxProps, Venue } from "../Interfaces"
import { BLUR_INPUT } from "../actions/actions"

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

interface MapProps {
    venue?: Venue;
    class: string;
    innerRef: any;
    styles?: {};
    map?: any;
    userMarker?: any;
    onClick?: any;
}

export const Map = (props: MapProps) => {


    let venueMarkers = []
    const loadMarkers = (currentVenue, map) => {
        // Ensure only new markers are rendered

        if (currentVenue && currentVenue.name && currentVenue.name.length > 0) {
            for (var i of venueMarkers) {
                console.log("This should trigger to remove markers")
                i.setMap(null);
            }
            venueMarkers = []
            let marker: Marker = createMarker(currentVenue, map)
            console.log("Marker: ", marker)
            // Click func to open/close infowindows
            marker.addListener("click", function () {
                console.log(marker.name);
            });

            venueMarkers.push(marker)
            console.log("Venue markers: ", venueMarkers);

        } else {
            return
        }
    }

    const createMarker = (val: Venue, map) => {
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
        // console.log("Create marker: ", marker)
        map.panTo(marker.getPosition())
        return marker
    }
    loadMarkers(props.venue, props.map)

    return (
        <div
            style={props.styles}
            onClick={props.onClick}
            className={props.class}
            ref={props.innerRef}
        />
    )
}