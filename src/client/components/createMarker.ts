import { Venue } from "../Interfaces"

export const createNewMarker = (venue, map) => {

    const pointval = new google.maps.LatLng(
        parseFloat(venue.location.lat.toString()),
        parseFloat(venue.location.lng.toString())
    )
    const marker = new google.maps.Marker({
        position: pointval,
        map: map,
        name: venue.name,
        rating: venue.rating.toFixed(0),
        reviews: ["This is the new marker generator"]
    })

    return marker

}


// Implementation: 
// const dummyVenue = {
//     name: "Hi there",
//     location: {
//         lat: 47.666122804221374,
//         lng: -122.38309135874057
//     },
//     rating: 8.5,
// }

// let newMarker = createNewMarker(dummyVenue, store.getState().markers.mapRef)
// console.log("New marker: ", newMarker);