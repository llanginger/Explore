import * as React from "react"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { BaseReduxProps } from "../Interfaces"
import { Hamburger } from "./Components"
import * as classNames from "classnames"
import { CLOSE_MENU, SHOW_SETTINGS_PAGE } from "../actions/actions"

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
        return (
            <ul className="settingsMenuUl">
                <li
                    onClick={() => {
                        store.dispatch(SHOW_SETTINGS_PAGE("account"))
                    }}
                ><span className="pt-icon-standard pt-icon-manual settingsMenuIcon" />Account</li>
                <li
                    onClick={() => {
                        store.dispatch(SHOW_SETTINGS_PAGE("preferences"))
                    }}
                ><span className="pt-icon-standard pt-icon-cog settingsMenuIcon" />Preferences</li>
                <li><span className="pt-icon-standard pt-icon-path-search settingsMenuIcon" />Places you've been</li>
                <li><span className="pt-icon-standard pt-icon-social-media settingsMenuIcon" />(Social)</li>
            </ul>
        )
    }

    const renderProfile = () => {
        return (
            <div className="profilePanel">
                <img
                    className="profileImage"
                    src="https://pbs.twimg.com/profile_images/2192831080/cartoon-headshot.png"
                />
                <div className="profileTextContainer">
                    <span className="profileText">TEXT INFO HERE</span>
                </div>
            </div>
        )
    }

    const closeMenu = () => {
        store.dispatch(CLOSE_MENU())
    }


    return (

        <div
            className={menuContainerClasses}
        >
            <div className="settingsMenu" >
                <div className="profileContainer">
                    {renderProfile()}
                </div>
                {renderList()}
            </div>
            <div
                onClick={closeMenu}
                className="settingsMenuBuffer"
            />
        </div>

    )
}