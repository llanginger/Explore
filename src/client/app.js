"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var redux_1 = require("redux");
var Store_1 = require("./Store");
var Body_1 = require("./components/Body");
var fakeArray = [
    "Thing 1",
    "Thing 2",
    "Thing 3",
    "Thing 4"
];
var store = redux_1.createStore(Store_1.appState);
ReactDOM.render(React.createElement(Body_1.Body, { store: store }), document.getElementById("app"));
