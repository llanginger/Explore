"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var axios = require("axios");
var MapElement = (function (_super) {
    __extends(MapElement, _super);
    function MapElement(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            forecast: []
        };
        _this.markers = [];
        return _this;
    }
    MapElement.prototype.componentDidMount = function () {
        this.map = this._createMap();
        this._loadFeatures();
    };
    MapElement.prototype._createMap = function () {
        var mapOptions = {
            zoom: 3,
            center: this._mapCenter(),
            disableDefaultUI: true
        };
        return new google.maps.Map(this.refs.mapdiv, mapOptions);
    };
    MapElement.prototype._mapCenter = function () {
        return new google.maps.LatLng(this.props.init_lat, this.props.init_lng);
    };
    MapElement.prototype._loadFeatures = function () {
        var self = this;
        var infoWindow = new google.maps.InfoWindow();
        axios.get(self.props.nps_source)
            .then(function (result) {
            console.log("nps source ajax request: ", result);
            for (var _i = 0, _a = result.data.features; _i < _a.length; _i++) {
                var val = _a[_i];
                var marker = self._createMarker(val, self.map);
                marker.addListener("click", function () {
                    infoWindow.close();
                    var title = this.title;
                    var infoContent = "";
                    var getWeather = false;
                    if (title in self.state.forecast) {
                        console.log("title in state");
                        infoContent = title + "<br>" + self.state.forecast[title];
                    }
                    else {
                        infoContent = title + "<br>Loading Current Weather...";
                        getWeather = true;
                    }
                    infoWindow.setContent(infoContent);
                    infoWindow.open(self.map, this);
                });
                self.markers.push(marker);
            }
        });
    };
    MapElement.prototype._createMarker = function (val, map) {
        var pointval = new google.maps.LatLng(parseFloat(val["geometry"]["coordinates"][1]), parseFloat(val["geometry"]["coordinates"][0]));
        var titleText = val["properties"]["title"];
        var marker = new google.maps.Marker({
            position: pointval,
            map: map,
            title: titleText
        });
        return marker;
    };
    MapElement.prototype.render = function () {
        return React.createElement("div", { style: this.props.styles, className: "NpsForecastMap", ref: "mapdiv" });
    };
    return MapElement;
}(React.Component));
exports.MapElement = MapElement;
var init_lng = -98.5795;
var init_lat = 39.8282;
var nps_url = "https://raw.githubusercontent.com/gizm00/blog_code/master/appendto/react_nps/np.geojson";
