"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var redux_1 = require("redux");
var input_1 = require("./components/input");
var Hamburger_1 = require("./components/Hamburger");
var Store_1 = require("./Store");
var MainBody = function (props) {
    return (React.createElement("div", { id: "mainApp", style: {
            position: "relative",
            width: "375px",
            height: "667px",
            marginLeft: "100px"
        } },
        React.createElement(input_1.InputTest, { style: { marginTop: "100px" }, placeholder: "What Do You Want?", disabled: false }),
        React.createElement(Hamburger_1.Hamburger, { store: props.store })));
};
var Hello = function (props) {
    return (React.createElement("div", null,
        "Hello ",
        props.name));
};
ReactDOM.render(React.createElement(MainBody, { store: redux_1.createStore(Store_1.appState) }), document.getElementById("app"));
