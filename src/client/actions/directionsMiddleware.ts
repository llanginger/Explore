export const directionsMiddleware = store => next => action => {



    switch (action.type) {
        case "MAP_LOADED":

            const mapRef = action.payload.mapRef
            const directionsRenderer = new google.maps.DirectionsRenderer({
                map: mapRef
            })
            const newAction = { ...action, payload: { ...action.payload, directionsRenderer } }
            console.log("New Directions action: ", newAction);

            return next(newAction)

        // const userMarker: google.maps.Marker = store.getState().userReducer.positionMarker
        // const currentVenue = store.getState().currentVenue

    }
    return next(action)
}