import * as firebase from "firebase"

export const fireMiddleware = store => next => action => {
    const user = firebase.auth().currentUser
    const venues = store.getState().visitedVenues
    switch (action.type) {
        case "VISITED_VENUE":
        case "LETS_GO":
            firebase.database().ref("users/" + user.uid).set({
                visitedVenues: venues
            })
            return next(action)
        case "CLEAR_VISITED_VENUES":
            firebase.database().ref("users/" + user.uid).set({
                visitedVenues: {}
            })
            return next(action)
    }
    next(action)
}

export const getInitialFireState = store => next => action => {
    const user = firebase.auth().currentUser
    switch (action.type) {
        case "LOG_IN":
            let fireVenues = {};
            firebase.database().ref("users/" + user.uid).once("value").then((dataSnap) => {
                if (dataSnap.val().visitedVenues) {

                    fireVenues = dataSnap.val().visitedVenues
                    store.dispatch({
                        type: "FIREBASE_VENUES",
                        fireVenues
                    })
                } else {
                    firebase.database().ref("users/" + user.uid).set({
                        visitedVenues: {}
                    })
                }
            })
            return next(action)
    }
    next(action)

}

export const clearFireDB = store => next => action => {
    const user = firebase.auth().currentUser
    switch (action.type) {
        case "CLEAR_VISITED_VENUES":

            firebase.database().ref("users/" + user.uid).set({
                visitedIds: [],
                visitedVenues: []
            })
            return next(action)
    }
    next(action)

}