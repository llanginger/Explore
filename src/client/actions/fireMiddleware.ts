import * as firebase from "firebase"
import { GPS } from "../Interfaces"

export const fireMiddleware = store => next => action => {
    const user = firebase.auth().currentUser
    const dbRef = firebase.database().ref("users/" + user.uid + "/visitedVenues/")
    const venues = store.getState().visitedVenues
    switch (action.type) {
        case "VISITED_VENUE":
        case "LETS_GO":
            dbRef.set(venues)
            return next(action)
        case "CLEAR_VISITED_VENUES":
            dbRef.set({})
            return next(action)
    }
    next(action)
}

export const getInitialFireState = store => next => action => {
    const user = firebase.auth().currentUser
    const dbRef = firebase.database().ref("users/" + user.uid)
    switch (action.type) {
        case "LOG_IN":
            dbRef.once("value").then((dataSnap) => {
                console.log("DataSnap: ", dataSnap.val());
                if (dataSnap.val().visitedVenues) {

                    const fireVenues = dataSnap.val().visitedVenues
                    const fireLocation: GPS = dataSnap.val().location

                    store.dispatch({
                        type: "SYNC_FIREBASE",
                        fireVenues,
                        gpsData: fireLocation
                    })
                } else {
                    dbRef.set({
                        visitedVenues: {},
                        location: {}
                    })
                }
            })
            return next(action)
    }
    next(action)

}

export const syncLocationInfo = store => next => action => {
    const user = firebase.auth().currentUser
    const dbRef = firebase.database().ref("users/" + user.uid + "/location/")
    switch (action.type) {
        case "SET_GPS_DATA":
            if (action.gpsData && action.gpsData !== undefined) {

                dbRef.set(action.gpsData)
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