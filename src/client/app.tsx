// process.env.NODE_ENV = "production";
console.log("Env: ", process.env.NODE_ENV)

import * as React from "react"
import * as ReactDOM from "react-dom"
import { createStore, applyMiddleware, Store, compose } from "redux"
import { default as thunk } from "redux-thunk";
import * as logger from "redux-logger"
import * as firebase from "firebase"

import { Reducers } from "./Store"
import { Body } from "./components/Body"
import { DevTools } from "./components/Devtools"
import { fireMiddleware, getInitialFireState } from "./actions/actions"

// --- FIREBASE --- //

var config = {
    apiKey: "AIzaSyAj872O59Keshsow9xO5BUSUX5JpMMKjJ8",
    authDomain: "explore-1487723306028.firebaseapp.com",
    databaseURL: "https://explore-1487723306028.firebaseio.com",
    storageBucket: "explore-1487723306028.appspot.com",
    messagingSenderId: "786779321569"
};

firebase.initializeApp(config);

// --- TESTING --- //



// --- END TESTING --- //

const enhancer = compose(
    applyMiddleware(thunk, fireMiddleware, getInitialFireState, logger()),
    DevTools.instrument()
)

let store: Store<Reducers> = createStore(Reducers, enhancer)


ReactDOM.render(
    <div>
        <Body store={store} />
        <DevTools store={store} />
    </div>,
    document.getElementById("app")
)

