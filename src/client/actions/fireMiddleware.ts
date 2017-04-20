import * as firebase from "firebase"
import { GPS } from "../Interfaces"

export const fireVenueMiddleware = store => next => action => {
    const user = firebase.auth().currentUser
    const venueDbRef = firebase.database().ref("users/" + user.uid + "/visitedVenues/")
    const venues = store.getState().visitedVenues


    switch (action.type) {
        case "VISITED_VENUE":
        case "LETS_GO":
            venueDbRef.child("visitedVenues").set(venues.visitedVenues)
            venueDbRef.child("visitedIds").set(venues.visitedIds)
            return next(action)
        case "CLEAR_VISITED_VENUES":
            venueDbRef.set({})
            return next(action)
    }
    next(action)
}

export const fireFavoritesMiddleware = store => next => action => {
    const user = firebase.auth().currentUser
    const favDbRef = firebase.database().ref("users/" + user.uid + "/favorites/")
    const favorites = store.getState().favorites.favoriteVenues

    switch (action.type) {
        case "ADD_TO_FAVORITES":
        case "OVERLAY_CLICKED":
        case "CLOSE_SETTINGS_PAGE":
            console.log("Favorite action: ", action);
            favDbRef.child("favoriteVenues").set(favorites.favoriteVenues)
            favDbRef.child("favoriteIds").set(favorites.favoriteIds)
            return next(action)
        case "CLEAR_FAVORITES":
            favDbRef.set({})
            return next(action)
        default:
            return next(action)
    }
}


export const syncLocationInfo = store => next => action => {
    const user = firebase.auth().currentUser
    const locDbRef = firebase.database().ref("users/" + user.uid + "/location/")
    switch (action.type) {
        case "SET_GPS_DATA":
            locDbRef.once("value").then((snap) => {
                console.log("Syc data snap: ", snap.val());
                console.log("DB ref: ", locDbRef);
            })
            if (action.gpsData && action.gpsData !== undefined) {

                locDbRef.update(action.gpsData)
            }
            return next(action)
    }
    return next(action)
}

// export const clearFireDB = store => next => action => {
//     const user = firebase.auth().currentUser
//     switch (action.type) {
//         case "CLEAR_VISITED_VENUES":

//             firebase.database().ref("users/" + user.uid).set({
//                 visitedIds: [],
//                 visitedVenues: []
//             })
//             return next(action)
//     }
//     next(action)

// }