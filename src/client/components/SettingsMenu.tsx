import * as React from "react"
import { BaseReduxProps } from "../Interfaces"
import { Hamburger } from "./Components"
import * as classNames from "classnames"

export const SettingsMenu = (props: BaseReduxProps) => {

    const { store } = props
    const menuState = store.getState().settingsMenu
    const menuContainerClasses = classNames({
        "settingsMenuContainer": true,
        "open": menuState.open,
        "closed": !menuState.open
    })

    const renderList = () => {
        if (menuState.open === true) {
            return (
                <ul className="settingsMenuUl">
                    <li>Hello</li>
                    <li>There</li>
                    <li>I'm</li>
                    <li>A</li>
                    <li>List</li>
                </ul>
            )
        } else {
            return
        }
    }

    return (
        <div
            className={menuContainerClasses}
        >
            <div
                onClick={() => {
                    console.log("Clicked inside menu");
                }}
                className="settingsMenu"
            > 
                {renderList()}
            </div>
            <div
                onClick={() => {
                    store.dispatch({
                        type: "CLOSE_MENU"
                    })
                }}
                className="settingsMenuBuffer" 
            />
        </div>
    )
}