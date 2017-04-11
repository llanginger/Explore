import { Venue } from "../Interfaces"

export const markerMiddleware = store => next => action => {
    const currentVenue = store.getState().currentVenue
    const mapRef = store.getState().map.mapRef
    const userReducer = store.getState().userReducer
    console.log("MapRef from markermiddleware: ", mapRef);
    switch (action.type) {
        case "NEXT_VENUE":
        case "PREV_VENUE":
        case "LETS_GO":

            if (action.type !== "LETS_GO") {
                currentVenue.marker.setMap(null)
            }

            const newVenue: Venue = { ...action.venue }
            newVenue.marker.setMap(mapRef)
            mapRef.panTo(newVenue.marker.getPosition())
            action = { ...action, venue: newVenue }
            return next(action)
        case "INPUT_GPS":
        case "FOCUS_INPUT":
            if (currentVenue.marker !== undefined) {
                currentVenue.marker.setMap(null)
            }
            return next(action)
        case "SYNC_FIREBASE":
            console.log("Mapref: ", mapRef);
            mapRef.setCenter({ lat: action.gpsData.geometry.lat, lng: action.gpsData.geometry.lng })
            return next(action)
        case "FOCUS_USER_MARKER":
            console.log("Marker: ", action.marker);
            mapRef.panTo(action.marker)
            return next(action);
        case "SET_GPS_DATA":
            if (userReducer.positionMarker) {
                console.log("Positionmarker found");
                const userMarker: google.maps.Marker = userReducer.positionMarker
                const newCoords = action.gpsData.geometry
                userMarker.setPosition(newCoords)
            } else {
                console.log("No PositionMarker");
                // Create a new marker
            }
            return next(action)
        case "USE_GPS_POS":
            console.log("User reducer: ", userReducer);
            if (userReducer.positionMarker) {
                const gpsPos = userReducer.gpsCoords
                const userMarker: google.maps.Marker = userReducer.positionMarker
                userMarker.setPosition(gpsPos)
                mapRef.panTo(gpsPos)
            }

            return next(action);

    }
    next(action)
}

// Do the setmap(mapRef) here on the action.venue, durr