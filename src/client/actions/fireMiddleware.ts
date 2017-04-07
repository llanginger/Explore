import * as firebase from "firebase"
import { GPS } from "../Interfaces"

export const fireMiddleware = store => next => action => {
    const user = firebase.auth().currentUser
    const dbRef = firebase.database().ref("users/" + user.uid + "/visitedVenues/")
    const venues = store.getState().visitedVenues


    switch (action.type) {
        case "VISITED_VENUE":
        case "LETS_GO":
            dbRef.child("visitedVenues").set(venues.visitedVenues)
            dbRef.child("visitedIds").set(venues.visitedIds)
            return next(action)
        case "CLEAR_VISITED_VENUES":
            dbRef.set({})
            return next(action)
    }
    next(action)
}


export const syncLocationInfo = store => next => action => {
    const user = firebase.auth().currentUser
    const dbRef = firebase.database().ref("users/" + user.uid + "/location/")
    switch (action.type) {
        case "SET_GPS_DATA":
            dbRef.once("value").then((snap) => {
                console.log("Syc data snap: ", snap.val());
                console.log("DB ref: ", dbRef);
            })
            if (action.gpsData && action.gpsData !== undefined) {

                dbRef.update(action.gpsData)
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