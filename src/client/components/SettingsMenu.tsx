import * as React from "react"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { BaseReduxProps } from "../Interfaces"
import { Hamburger, FirebaseForm } from "./Components"
import * as classNames from "classnames"
import { CLOSE_MENU, SHOW_SETTINGS_PAGE, LOG_OUT } from "../actions/actions"
import * as firebase from "firebase"
import Autocomplete from "react-google-autocomplete"
import { SettingsMenuComponents } from "./SettingsMenuComponents"

export const SettingsMenu = (props: BaseReduxProps) => {

    const tempProfileUrl = "https://pbs.twimg.com/profile_images/2192831080/cartoon-headshot.png"
    const { store } = props
    const state = store.getState()
    const currentUser = firebase.auth().currentUser
    const reduxUser = state.userReducer


    const menuState = state.settingsMenu
    const colors = state.colors
    const getUserName: () => string = () => {
        if (currentUser.displayName && firebase.auth().currentUser.displayName.length > 0) {
            return currentUser.displayName
        } else {
            return currentUser.email
        }
    }


    // Don't think I need this
    const menuContainerClasses = classNames({
        "settingsMenuContainer": true,
        "open": menuState.open,
        "closed": !menuState.open
    })

    const formFunction = (val) => {
        console.log(val)
    }


    const closeMenu = () => {
        store.dispatch(CLOSE_MENU())
    }

    const placesClick = (page: string) => {
        store.dispatch(SHOW_SETTINGS_PAGE("places"))
    }

    const accountClick = (page: string) => {
        store.dispatch(SHOW_SETTINGS_PAGE("account"))
    }

    const favoritesClick = (page: string) => {
        store.dispatch(SHOW_SETTINGS_PAGE("favorites"))
    }

    const logOut = () => {
        firebase.auth().signOut()
        store.dispatch(LOG_OUT())
    }

    const themeOnClick = () => {
        store.dispatch({ type: "TOGGLE_THEME_OPTIONS" })
    }

    return (

        <SettingsMenuComponents
            profileImage={reduxUser.profilePic}
            userName={getUserName()}
            accountOnClick={accountClick}
            placesOnClick={placesClick}
            favoritesOnClick={favoritesClick}
            themeOptionsOnClick={themeOnClick}
            logOutOnClick={logOut}
            bufferOnClick={closeMenu}
            colors={colors}
        />
    )
}