let routeBounds: any = false;

const service = new google.maps.DirectionsService

const calcRoute = (renderer: google.maps.DirectionsRenderer, map: google.maps.Map, start, end) => {
    const request: google.maps.DirectionsRequest = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING
    }

    service.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            renderer.setDirections(response);

            routeBounds = response.routes[0].bounds;

            map.fitBounds(routeBounds);
            google.maps.event.addListener(map, "idle", () => {
                offsetMap(map);
            })

            // google.maps.event.addListener(renderer, "directions_changed", () => {
            //     let updatedResponse = renderer.getDirections()
            //     routeBounds = updatedResponse.routes[0].bounds
            //     console.log("Route bounds: ", routeBounds);
            //     offsetMap(map)

            // })
        }
    })

}


const offsetMap = (map: google.maps.Map) => {
    if (routeBounds !== false) {
        google.maps.event.clearListeners(map, "idle")

        map.panBy(0, -70)

    }
}


export const directionsMiddleware = store => next => action => {
    const renderer: google.maps.DirectionsRenderer = store.getState().map.directionsRenderer
    const map: google.maps.Map = store.getState().map.mapRef
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
            renderer.setDirections({ routes: [] });
            routeBounds = false;
            const { start, end } = action.startEnd
            calcRoute(renderer, map, start, end)
            return next(action)
        case "NEXT_VENUE":
        case "PREV_VENUE":
        case "FOCUS_INPUT":
        case "INPUT_GPS":
            renderer.setDirections({ routes: [] })
            routeBounds = false;
            return next(action)

    }
    return next(action)
}