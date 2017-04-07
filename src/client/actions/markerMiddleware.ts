import { Venue } from "../Interfaces"

export const markerMiddleware = store => next => action => {
    const currentVenue = store.getState().currentVenue
    const mapRef = store.getState().map.mapRef
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
            action.marker.setMap(null)
            return next(action)
        case "SYNC_FIREBASE":
            console.log("Mapref: ", mapRef);
            mapRef.setCenter({ lat: action.gpsData.geometry.lat, lng: action.gpsData.geometry.lng })
            return next(action)
        case "FOCUS_USER_MARKER":
            console.log("Marker: ", action.marker);
            mapRef.panTo(action.marker)
            return next(action);
    }
    next(action)
}

// Do the setmap(mapRef) here on the action.venue, durr