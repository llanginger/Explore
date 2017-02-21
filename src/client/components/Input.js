"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var core_1 = require("@blueprintjs/core");
var styles = {
    marginTop: "100px"
};
var InputTest = (function (_super) {
    __extends(InputTest, _super);
    function InputTest(props) {
        return _super.call(this, props) || this;
    }
    InputTest.prototype.render = function () {
        return (React.createElement(core_1.InputGroup, { className: "pt-large testInput", intent: core_1.Intent.SUCCESS, leftIconName: "filter", placeholder: this.props.placeholder, disabled: this.props.disabled }));
    };
    return InputTest;
}(React.Component));
exports.InputTest = InputTest;
