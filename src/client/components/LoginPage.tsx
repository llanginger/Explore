import * as React from "react"
import { BaseReduxProps, User } from "../Interfaces"
import { LOG_IN } from "../actions/actions"

export const LoginPage = (props: BaseReduxProps) => {

    const { store } = props

    const dummyUser: User = {
        name: "Leo",
        id: "123"
    }

    const logIn = () => {
        store.dispatch(LOG_IN(dummyUser))
    }
    const pageStyles = {
        height: "100%",
        width: "100%",
        backgroundColor: "#0732a2",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "20px",
        textAlign: "center"
    }

    const containerStyles = {

    }


    const inputStyles = {
        padding: "5px",
        boxSizing: "border-box",
        border: "5px solid palevioletred",
        width: "100%",
        marginBottom: "10px"
    }

    const buttonStyles = {
        ...inputStyles,
        backgroundColor: "white",
        color: "black"
    }
    return (
        <div
            className="logginPage"
            style={pageStyles}
        >
            <div
                className="loginContainer"
                style={containerStyles}
            >
                <p>Log In here</p>
                <input style={inputStyles} type="text" placeholder="UserName" />
                <input style={inputStyles} type="text" placeholder="Password" />
                <button style={buttonStyles} onClick={logIn}> Log In </button>
            </div>
        </div>
    )
}