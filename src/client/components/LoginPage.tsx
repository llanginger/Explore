import * as React from "react"
import { BaseReduxProps, User } from "../Interfaces"
import { LOG_IN } from "../actions/actions"
import * as firebase from "firebase"
import styled from "styled-components"

export interface LoginPageProps extends BaseReduxProps { }

export class LoginPage extends React.Component<LoginPageProps, any> {

    private email: any;
    private password: any;
    constructor(props) {
        super(props)

        this._logIn = this._logIn.bind(this)
        this._logOut = this._logOut.bind(this)
        this._signUp = this._signUp.bind(this)
    }


    _logIn(e) {
        const email = this.email.value;
        const pass = this.password.value;
        const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
        promise.catch(e => alert(e.message))
        e.preventDefault()
    }

    _logOut(e) {
        firebase.auth().signOut()
        e.preventDefault()
    }

    _signUp(e) {
        const email = this.email.value;
        const pass = this.password.value;
        const promise = firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => {
            firebase.database().ref("users/" + firebase.auth().currentUser.uid).set({
                visitedVenues: {}
            })
        });
        promise.catch(e => alert(e.message))
        e.preventDefault()
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user)
                this.props.store.dispatch(LOG_IN({ email: user.email }))
            } else {
                console.log("Not logged in")
            }
        })
    }


    render() {
        const dummyUser: User = {
            email: "Leo",
            id: "123"
        }


        // const pageStyles = {
        //     height: "100%",
        //     width: "100%",
        //     backgroundColor: "#669EFF",
        //     position: "relative",
        //     display: "flex",
        //     alignItems: "center",
        //     justifyContent: "center",
        //     color: "white",
        //     fontSize: "20px",
        //     textAlign: "center"
        // }

        const Page = styled.div`
            height: 100%;
            width: 100%;
            background-color: #669EFF;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 20px;
            text-align: center;
        `

        const containerStyles = {
            width: "80%"
        }

        const Input = styled.input`
            padding: 7px;
            position: relative;
            box-sizing: border-box;
            display: inline-block;
            border: none;
            width: 100%;
            box-shadow: 3px 3px 3px #333;
            margin-bottom: 10px;

            &:focus {
                outline: none;
            }
        `

        const InputSubmit = styled.input`
            padding: 7px;
            box-sizing: border-box;
            width: 48%;
            border: none;
            box-shadow: 3px 3px 3px #333;
            margin-bottom: 10px;
            background-color: white;
            color: black;
            transition: all .02s ease-in-out;

            &:hover {
                transform: translateY(-1px);
                box-shadow: 4px 4px 4px #333;
            }

            &:active {
                outline: none;
                transform: translateY(2px);
                box-shadow: 1px 1px 1px #333;
            }
        `

        return (
            <Page
                className="logginPage"
            >
                <form
                    onSubmit={this._logIn}
                    className="loginContainer"
                    style={containerStyles}
                >
                    <p>Log In here</p>
                    <Input
                        type="text"
                        placeholder="UserName"
                        innerRef={(input) => this.email = input}
                    />
                    <Input
                        type="text"
                        placeholder="Password"
                        innerRef={(input) => this.password = input}
                        onSubmit={this._logIn}
                    />
                    <InputSubmit
                        type="submit"
                        style={{ marginRight: "2%" }}
                        onClick={this._logIn}
                        value="Log In"
                    />
                    <InputSubmit
                        type="submit"
                        style={{ marginLeft: "2%" }}
                        onClick={this._signUp}
                        value="Create New Account"
                    />
                </form>
            </Page>
        )
    }
}



/*<input
                        style={inputStyles}
                        type="text"
                        placeholder="UserName"
                        ref={(input) => this.email = input}
                    />*/