import { MOVED_MARKER } from "./actions"
import { Colors } from "../components/Utility/Colors"

export const naviMiddleware = store => next => action => {

    const createUserMarker = (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const pointval = new google.maps.LatLng(
            parseFloat(lat.toString()),
            parseFloat(lng.toString())
        )

        const icon = {

            path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
            fillColor: Colors.BLUE,
            fillOpacity: 1,
            strokeColor: "#333",
            strokeWeight: 1,
            scale: 0.7
        }


        const marker = new google.maps.Marker({
            position: pointval,
            map: action.payload.mapRef,
            draggable: true,
            icon: icon
        })
        marker.addListener("dragend", () => store.dispatch(MOVED_MARKER(marker)))
        console.log("user Marker: ", marker);

        store.dispatch({
            type: "USER_MARKER_CREATED",
            userInfo: {
                profileInfo: {
                    positionMarker: marker,
                    gpsCoords: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                }
            }
        })
        action.payload.mapRef.setCenter(pointval)
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