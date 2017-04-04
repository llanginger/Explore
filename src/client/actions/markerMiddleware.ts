import { Venue } from "../Interfaces"

export const markerMiddleware = store => next => action => {
    const currentVenue = store.getState().currentVenue
    const mapRef = store.getState().markers.mapRef
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

    }
    next(action)
}

// Do the setmap(mapRef) here on the action.venue, durr