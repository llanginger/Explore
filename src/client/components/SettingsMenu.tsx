import * as React from "react"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { BaseReduxProps } from "../Interfaces"
import { Hamburger, FirebaseForm } from "./Components"
import * as classNames from "classnames"
import { CLOSE_MENU, SHOW_SETTINGS_PAGE, LOG_OUT } from "../actions/actions"
import * as firebase from "firebase"

export const SettingsMenu = (props: BaseReduxProps) => {

    const tempProfileUrl = "https://pbs.twimg.com/profile_images/2192831080/cartoon-headshot.png"
    const { store } = props

    const state = store.getState()

    const menuState = state.settingsMenu
    const getUserName = () => state.loggedIn.user.email

    const menuContainerClasses = classNames({
        "settingsMenuContainer": true,
        "open": menuState.open,
        "closed": !menuState.open
    })

    const formFunction = (val) => {
        console.log(val)
    }

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
                <li
                    onClick={() => {
                        firebase.auth().signOut()
                        store.dispatch(LOG_OUT())
                    }}
                ><span className="pt-icon-standard pt-icon-social-media settingsMenuIcon" />Log Out</li>
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
                    <span className="profileText">{getUserName()}</span>
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