import * as React from "react"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { BaseReduxProps } from "../Interfaces"
import { Hamburger } from "./Components"
import * as classNames from "classnames"

export const SettingsMenu = (props: BaseReduxProps) => {
    const tempProfileUrl = "https://pbs.twimg.com/profile_images/2192831080/cartoon-headshot.png"
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
                    <li>Account</li>
                    <li>Preferences</li>
                    <li>Places you've been</li>
                    <li>(Social)</li>
                </ul>
            )
        } else {
            return
        }
    }

    const renderImage = () => {
        if (menuState.open === true) {
            return (
                <img 
                    className="profileImage"
                    src="https://pbs.twimg.com/profile_images/2192831080/cartoon-headshot.png"
                />
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
                <div className="profilePanel">
                    <ReactCSSTransitionGroup
                        transitionName={"profileImageAnim"}
                        transitionAppear={true}
                        transitionAppearTimeout={300}
                        transitionLeaveTimeout={300}
                        transitionEnterTimeout={300}
                    >
                        {renderImage()}
                    </ReactCSSTransitionGroup>
                </div>
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