import { Venue, PAction } from "../Interfaces"
import { newUserMarker } from "../components/Utility/createUserMarker"

export const markerMiddleware = store => next => (action: PAction) => {
    const currentVenue: Venue = store.getState().currentVenue
    const mapRef: google.maps.Map = store.getState().map.mapRef
    const userReducer = store.getState().userReducer
    console.log("MapRef from markermiddleware: ", mapRef);
    switch (action.type) {
        case "NEXT_VENUE":
        case "PREV_VENUE":
        case "LETS_GO":
        case "SHOW_FAVORITE":

            // Split these into their own switch statements
            if (currentVenue.marker !== undefined) {
                currentVenue.marker.setMap(null)
            }

            const newVenue: Venue = { ...action.payload.venue }
            console.log("New venue from marker middleware: ", newVenue);
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
            mapRef.setCenter({ lat: action.payload.gpsData.lat, lng: action.payload.gpsData.lng })
            return next(action)
        case "FOCUS_USER_MARKER":
            console.log("Marker: ", action.payload.marker);
            mapRef.panTo(action.payload.marker)
            return next(action);
        case "SET_GPS_DATA":
            if (userReducer.positionMarker) {
                console.log("Positionmarker found");
                const userMarker: google.maps.Marker = userReducer.positionMarker
                const newCoords = action.payload.gpsData
                userMarker.setPosition(newCoords)
            } else {
                console.log("No PositionMarker");
                const marker = newUserMarker(action.payload.gpsData, mapRef)
                store.dispatch({
                    type: "USER_MARKER_CREATED",
                    userInfo: {
                        profileInfo: {
                            positionMarker: marker,
                            gpsCoords: {
                                lat: marker.getPosition().lat(),
                                lng: marker.getPosition().lng()
                            }
                        }
                    }
                })
                mapRef.setCenter(marker.getPosition())
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