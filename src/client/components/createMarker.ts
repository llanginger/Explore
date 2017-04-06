import { Venue } from "../Interfaces"


export const createNewMarker = (venue: Venue, map) => {

    const pointval = new google.maps.LatLng(
        parseFloat(venue.location.lat.toString()),
        parseFloat(venue.location.lng.toString())
    )

    const opts = {
        position: pointval,
        map: map,
        name: venue.name,
        animation: google.maps.Animation.DROP,
        rating: venue.rating.toFixed(0),
        reviews: ["This is the new marker generator"]
    }
    const marker = new google.maps.Marker(opts)

    return marker

}
