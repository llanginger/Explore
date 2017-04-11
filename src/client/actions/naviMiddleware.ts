import { MOVED_MARKER } from "./actions"

export const naviMiddleware = store => next => action => {

    const createUserMarker = (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const pointval = new google.maps.LatLng(
            parseFloat(lat.toString()),
            parseFloat(lng.toString())
        )

        const marker = new google.maps.Marker({
            position: pointval,
            map: action.payload.mapRef,
            draggable: true,
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
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