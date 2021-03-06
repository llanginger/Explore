import { MOVED_MARKER } from "../actions/actions"
import { Colors } from "../components/Utility/Colors"
import { PAction } from "../Interfaces"
import { newUserMarker } from "../components/Utility/createUserMarker"

export const naviMiddleware = store => next => (action: PAction) => {

    const createUserMarker = (position) => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const pointval = new google.maps.LatLng(
            parseFloat(lat.toString()),
            parseFloat(lng.toString())
        )

        const mapRef: google.maps.Map = action.payload.mapOpts.mapRef
        const marker: google.maps.Marker = newUserMarker(pointval, action.payload.mapOpts.mapRef)

        console.log("marker from nav middleware: ", marker);

        store.dispatch({
            type: "USER_MARKER_CREATED",
            payload: {
                profileInfo: {
                    positionMarker: marker,
                    gpsCoords: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                }
            }
        })
        mapRef.setCenter(marker.getPosition())
        return next(action)
    }

    const error = (err) => {
        console.log("Error retrieving gps data", err)
        store.dispatch({ type: "NO_GPS_AVAILABLE" })
        return next(action)
    }

    switch (action.type) {
        case "MAP_LOADED":
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(createUserMarker, error)
                return next(action)
            } else {
                store.dispatch({ type: "NO_GPS_AVAILABLE" })
                return next(action)
            }
    }
    return next(action)
}