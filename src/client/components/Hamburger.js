"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Hamburger = (function (_super) {
    __extends(Hamburger, _super);
    function Hamburger(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isActive: false
        };
        _this._isActive = _this._isActive.bind(_this);
        return _this;
    }
    Hamburger.prototype.componentDidMount = function () {
        var _this = this;
        var store = this.props.store;
        console.log("logging store from hamburger: ", store);
        this.unsubscribe = store.subscribe(function () {
            _this.forceUpdate();
        });
    };
    Hamburger.prototype.componentWillUnmount = function () {
        this.unsubscribe();
    };
    Hamburger.prototype._isActive = function () {
        console.log("Clicked hmaburger");
        console.log("Hamburger props: ", this.props.store.getState());
        return "c-hamburger c-hamburger--htx" + (this.props.store.getState().settingsMenu === "OPEN_MENU" ? " is-active" : "");
    };
    Hamburger.prototype.render = function () {
        var _this = this;
        return (React.createElement("button", { onClick: function () {
                if (_this.props.store.getState().settingsMenu === "CLOSE_MENU") {
                    _this.props.store.dispatch({
                        type: "OPEN_MENU"
                    });
                }
                else {
                    _this.props.store.dispatch({
                        type: "CLOSE_MENU"
                    });
                }
                console.log(_this.props.store.getState());
            }, className: this._isActive() },
            React.createElement("span", null, "toggle menu")));
    };
    return Hamburger;
}(React.Component));
exports.Hamburger = Hamburger;
