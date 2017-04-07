export const directionsMiddleware = store => next => action => {



    switch (action.type) {
        case "MAP_LOADED":

            const mapRef = action.payload.mapRef
            const directionsRenderer = new google.maps.DirectionsRenderer({
                map: mapRef
            })
            directionsRenderer.setOptions({
                suppressMarkers: true,
                polylineOptions: {
                    strokeWeight: 4,
                    strokeOpacity: 1,
                    strokeColor: '#B10DC9'
                }
            });

            const newAction = { ...action, payload: { ...action.payload, directionsRenderer } }
            console.log("New Directions action: ", newAction);

            return next(newAction)

        case "SHOW_DIRECTIONS":
            const renderer: google.maps.DirectionsRenderer = store.getState().map.directionsRenderer
            renderer.setDirections({ routes: [] });
            const service = new google.maps.DirectionsService
            const { start, end } = action.startEnd
            console.log("Start: ", start);
            console.log("End: ", end);
            const route: google.maps.DirectionsRequest = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.WALKING
            }

            service.route(route, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    renderer.setDirections(result);
                }
            });
            return next(action)


    }
    return next(action)
}