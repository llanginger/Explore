import { Colors } from "./Colors"
import { MOVED_MARKER } from "../../actions/actions"
import { store } from "../../Store"

interface coords {
    coords: google.maps.LatLng | google.maps.LatLngLiteral
}

export const newUserMarker: (coords: google.maps.LatLng | google.maps.LatLngLiteral, mapRef: google.maps.Map) => google.maps.Marker = (coords: google.maps.LatLng | google.maps.LatLngLiteral, mapRef: google.maps.Map) => {


    const icon = {

        path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
        fillColor: Colors.BLUE,
        fillOpacity: 1,
        strokeColor: "#333",
        strokeWeight: 1,
        scale: 0.7
    }


    const marker = new google.maps.Marker({
        position: coords,
        map: mapRef,
        draggable: true,
        icon: icon
    })

    marker.addListener("dragend", () => store.dispatch(MOVED_MARKER(marker)))
    console.log("user Marker: ", marker);

    return marker
}