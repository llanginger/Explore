

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
            map: action.mapRef,
            draggable: true,
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        })
        console.log("user Marker: ", marker);
        store.dispatch({ type: "USER_MARKER_CREATED", userInfo: { positionMarker: marker } })
        return next(action)
    }

    const error = (err) => {
        console.log("Error retrieving gps data")
        return next(action)
    }

    switch (action.type) {
        case "MAP_LOADED":
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(createUserMarker, error)
            } else {
                store.dispatch({ type: "NO_GPS_AVAILABLE" })
            }
    }
    return next(action)
}


