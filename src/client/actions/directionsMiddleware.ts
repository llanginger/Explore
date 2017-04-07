// export const directionsMiddleware = store => next => action => {
//     const mapRef = store.getState().map.mapRef
//     const directionsService = new google.maps.DirectionsService()
//     const directionsDisplay = new google.maps.DirectionsRenderer({
//         map: mapRef
//     })
//     directionsDisplay.setOptions({ suppressMarkers: true });

//     const userMarker: google.maps.Marker = store.getState().userReducer.positionMarker
//     const currentVenue = store.getState().currentVenue

//     switch (action.type) {
//         case "SHOW_DIRECTIONS":

//             directionsDisplay.setMap(null);
//             directionsDisplay.setMap(mapRef);
//             const start = { lat: userMarker.getPosition().lat(), lng: userMarker.getPosition().lng() }
//             const end = { lat: currentVenue.location.lat, lng: currentVenue.location.lng }
//             directionsService.route({
//                 origin: start,
//                 destination: end,
//                 travelMode: google.maps.TravelMode.WALKING
//             }, (result, status) => {
//                 if (status == google.maps.DirectionsStatus.OK) {
//                     console.log("Directions response: ", result);
//                     directionsDisplay.setDirections(result);
//                 } else {
//                     console.log("Failed to set directions");
//                 }
//             })
//             return next(action)
//     }
//     return next(action)
// }