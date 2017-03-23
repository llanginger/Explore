import * as React from "react"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { BaseReduxProps } from "../Interfaces"
import { CLOSE_SETTINGS_PAGE } from "../actions/actions"

export const PreferencesPage = (props: BaseReduxProps) => {
    const { store } = props
    return (
        <div
            className="preferencesPage"
            style={{
                height: "100%",
                width: "100%",
                background: "honeydew",
                position: "absolute",
                top: "0px",
                left: "0px"
            }}
            onClick={() => {
                store.dispatch(CLOSE_SETTINGS_PAGE())
            }}
        />
    )
}