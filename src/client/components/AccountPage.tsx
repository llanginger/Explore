import * as React from "react"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { BaseReduxProps } from "../Interfaces"
import { CLOSE_SETTINGS_PAGE } from "../actions/actions"


export const AccountPage = (props) => {

    const basicStyles = {
        height: "100%",
        width: "100%",
        position: "absolute",
        top: "0px",
        left: "0px"
    }
    return (

        <div
            className="accountPage"
            style={{ ...basicStyles, background: "palevioletred" }}
            onClick={props.onClick}
        />

    )
}