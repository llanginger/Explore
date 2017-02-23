"use strict";
var React = require("react");
var Input_1 = require("./Input");
var Hamburger_1 = require("./Hamburger");
var NewMap_1 = require("./NewMap");
var queryFoursquare_1 = require("../queryFoursquare");
var fakeArray = [
    "Thing 1",
    "Thing 2",
    "Thing 3",
    "Thing 4"
];
queryFoursquare_1.queryFourSquare("Hello");
var init_lng = -98.5795;
var init_lat = 39.8282;
var nps_url = "https://raw.githubusercontent.com/gizm00/blog_code/master/appendto/react_nps/np.geojson";
exports.Body = function (props) {
    return (React.createElement("div", { id: "mainApp", style: {
            position: "relative",
            width: "375px",
            height: "667px",
            marginLeft: "100px"
        } },
        React.createElement("div", { style: {
                position: "absolute",
                width: "100%",
                height: "70%",
                backgroundColor: "yellow"
            } }),
        React.createElement(NewMap_1.MapElement, { styles: {
                height: "80%",
                width: "100%"
            }, className: "mapiv", init_lat: init_lat, init_lng: init_lng, nps_source: nps_url }),
        React.createElement(Input_1.InputTest, { style: { marginTop: "100px" }, placeholder: "What Do You Want?", disabled: false }),
        React.createElement(Hamburger_1.Hamburger, { store: props.store, styles: {
                position: "absolute",
                top: "5px",
                left: "5px",
                filter: "drop-shadow(5px 5px 5px #333)"
            } })));
};
