import * as React from "react"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { BaseReduxProps } from "../Interfaces"
import { CLOSE_SETTINGS_PAGE } from "../actions/actions"
import { FirebaseUserForm } from "./Components"
import * as firebase from "firebase"


export const AccountPage = (props) => {

    const basicStyles = {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bottom: "0px",
        left: "0px"
    }

    const changeUserName = (e) => {
        e.stopPropagation()
        const userName = firebase.auth().currentUser.displayName
    }

    const containerStyles = {
        width: "90%"
    }

    return (

        <div
            className="accountPage"
            style={{ ...basicStyles, background: "palevioletred" }}
            onClick={props.onClick}
        >
            <div
                className="formContainer"
                style={containerStyles}
            >
                <FirebaseUserForm
                    inputName="Change your username"
                    inputPlaceholder="Username"
                    buttonName="Submit"
                    profileTarget="displayName"
                />
                <FirebaseUserForm
                    inputName="Change your email"
                    inputPlaceholder="email"
                    buttonName="Submit"
                    profileTarget="email"
                />
            </div>
        </div>

    )
}