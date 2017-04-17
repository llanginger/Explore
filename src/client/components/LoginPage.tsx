import * as React from "react"
import { BaseReduxProps, User } from "../Interfaces"
import { LOG_IN } from "../actions/actions"
import * as firebase from "firebase"
import styled from "styled-components"
import { Colors } from "../Interfaces"

interface LCProps {
    color: any
}

const dummyUser: User = {
    email: "Leo",
    userName: "LEO",
    profilePic: "www.google.com"
}


const Page = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${(props: LCProps) => props.color.ACCENT};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    text-align: center;
`

const Form = styled.form`
    width: 80%;

    @media(min-width: 700px) {
        width: 500px;
    }
`

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
                const dbRef = firebase.database().ref("users/" + user.uid)
                dbRef.once("value").then((snap) => {
                    if (snap.val() === null) {
                        // --- If database empty, populate with placeholder data --- //
                        console.log("Snap was null");
                        dbRef.set({
                            visitedVenues: {
                                visitedVenues: [{
                                    placeholder: "placeholder"
                                }],
                                visitedIds: ["123"]
                            },
                            location: {
                                formattedAddress: "",
                                geometry: {
                                    lat: 0,
                                    lng: 0
                                },
                                name: "",
                                types: "",
                                vicinity: ""
                            }
                        })
                    }
                    dbRef.once("value").then((snap) => {
                        const initFireState = snap.val()
                        console.log("Init fire db state: ", initFireState);

                        let initVenues = {
                            visitedIds: [],
                            visitedVenues: []
                        }
                        if (initFireState.visitedVenues && initFireState.visitedVenues.visitedIds) {
                            initVenues = initFireState.visitedVenues
                        }
                        const loginObj = {
                            profileInfo: {
                                email: user.email,
                                userName: user.displayName,
                                profilePic: user.photoURL
                            },
                            dbInfo: {
                                visitedVenues: initVenues,
                                location: initFireState.location
                            }
                        }
                        console.log("LoginObj: ", loginObj);
                        this.props.store.dispatch(LOG_IN(loginObj))
                    })
                })

            } else {
                console.log("Not logged in")
            }
        })
    }


    render() {
        const colors = this.props.store.getState().colors
        return (
            <Page
                className="logginPage"
                color={colors}
            >
                <Form
                    onSubmit={this._logIn}
                    className="loginContainer"
                >
                    <p>Log In here</p>
                    <Input
                        type="text"
                        placeholder="Email Address"
                        innerRef={(input) => this.email = input}
                    />
                    <Input
                        type="password"
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
                </Form>
            </Page>
        )
    }
}

