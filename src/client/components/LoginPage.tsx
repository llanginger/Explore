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
    display: flex;
    flex-direction: column;
`

const Form = styled.form`
    width: 80%;

    @media(min-width: 700px) {
        width: 500px;
    }
`

const Logo = styled.div`
    text-align: center;
    width: 80%;

    @media(min-width: 700px) {
        width: 500px;
    }

    & > p {
        font-size: 50px;
        text-shadow: 2px 2px 2px #E040FB;
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
    width: 100%;
    border: none;
    box-shadow: 3px 3px 3px #333;
    margin-bottom: 10px;
    background-color: white;
    color: black;
    transition: all .02s ease-in-out;
    -webkit-appearance: none;

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

interface LoginPageState {
    logIn: boolean;
    newAccount: boolean;
}

export class LoginPage extends React.Component<LoginPageProps, LoginPageState> {

    private email: HTMLInputElement;
    private password: HTMLInputElement;
    private passwordCheck: HTMLInputElement;
    constructor(props) {
        super(props)

        this._logIn = this._logIn.bind(this)
        this._logOut = this._logOut.bind(this)
        this._signUp = this._signUp.bind(this)
        this._whichView = this._whichView.bind(this)
        this._showLogIn = this._showLogIn.bind(this)
        this._showNewAccount = this._showNewAccount.bind(this)
        this._showHome = this._showHome.bind(this)

        this.state = {
            logIn: false,
            newAccount: false,
        }
    }


    _logIn(e) {
        const email = this.email.value.trim();
        const pass = this.password.value.trim();
        const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
        promise.catch(e => alert(e.message))
        e.preventDefault()
    }

    _logOut(e) {
        firebase.auth().signOut()
        e.preventDefault()
    }

    _signUp(e) {
        e.preventDefault()
        const email = this.email.value.trim();
        const pass = this.password.value.trim();
        const passCheck = this.passwordCheck.value.trim()
        if (pass === passCheck) {
            const promise = firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => {
                firebase.database().ref("users/" + firebase.auth().currentUser.uid).set({
                    visitedVenues: {}
                })
            });
            promise.catch(e => alert(e.message))
        } else {
            alert("Oops, your passwords did not match! Please try again")
            this.password.value = ""
            this.passwordCheck.value = ""
        }
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
                            favoriteVenues: {
                                favoriteVenues: [{
                                    placeholder: "placeholder"
                                }],
                                favoriteIds: ["123"]
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

                        const removePlaceholder = (venues) => {
                            if (venues[0].hasOwnProperty("placeholder")) {
                                console.log("Has prop", venues[0]);
                                venues.shift()
                                return venues
                            } else {
                                return venues
                            }
                        }

                        const removePlaceholderId = (ids: string[]) => {
                            if (ids[0].length === 3) {
                                ids.shift()
                                return ids
                            } else {
                                return ids
                            }
                        }

                        let initVenues = {
                            visitedIds: [],
                            visitedVenues: []
                        }

                        if (
                            initFireState.visitedVenues &&
                            initFireState.visitedVenues.visitedIds
                        ) {
                            let visitedVenues = [...initFireState.visitedVenues.visitedVenues]
                            let visitedIds = [...initFireState.visitedVenues.visitedIds]

                            initVenues = {
                                visitedIds: removePlaceholderId(visitedIds),
                                visitedVenues: removePlaceholder(visitedVenues)
                            }
                        }

                        let initFavorites = {
                            favoriteIds: [],
                            favoriteVenues: []
                        }

                        if (
                            initFireState.favorites &&
                            initFireState.favorites.favoriteIds
                        ) {
                            let favoriteVenues = [...initFireState.favorites.favoriteVenues]
                            let favoriteIds = [...initFireState.favorites.favoriteIds]

                            initFavorites = {
                                favoriteIds: removePlaceholderId(favoriteIds),
                                favoriteVenues: removePlaceholder(favoriteVenues)
                            }
                            console.log("Init favorites: ", initFavorites);
                        }


                        const loginObj = {
                            profileInfo: {
                                email: user.email,
                                userName: user.displayName,
                                profilePic: user.photoURL
                            },
                            dbInfo: {
                                visitedVenues: initVenues,
                                favoriteVenues: initFavorites,
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

    _showLogIn() {
        this.setState({ logIn: true, newAccount: false })
    }

    _showNewAccount() {
        this.setState({ newAccount: true, logIn: false })
    }

    _showHome() {
        this.setState({ logIn: false, newAccount: false })
    }

    _whichView() {
        const state = this.state
        if ((state.logIn === false && state.newAccount === false) || (state.logIn === true && state.newAccount === true)) {
            return (
                <Form
                    onSubmit={this._showLogIn}
                    className="loginContainer"
                >
                    <InputSubmit
                        type="submit"
                        onClick={this._showLogIn}
                        value="Log In"
                    />
                    <InputSubmit
                        type="submit"
                        onClick={this._showNewAccount}
                        value="New Account"
                    />
                </Form>
            )
        } else if (state.logIn === true) {
            return (
                <Form
                    onSubmit={this._logIn}
                    className="loginContainer"
                >
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
                        onClick={this._logIn}
                        value="Log In"
                    />
                    <InputSubmit
                        type="submit"
                        onClick={this._showHome}
                        value="Back"
                    />
                </Form>
            )
        } else if (state.newAccount === true) {
            return (
                <Form
                    onSubmit={this._logIn}
                    className="loginContainer"
                >
                    <Input
                        type="text"
                        placeholder="Email Address"
                        innerRef={(input) => this.email = input}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        innerRef={(input) => this.password = input}
                        onSubmit={this._signUp}
                    />
                    <Input
                        type="password"
                        placeholder="Enter Password Again"
                        innerRef={(input) => this.passwordCheck = input}
                        onSubmit={this._signUp}
                    />
                    <InputSubmit
                        type="submit"
                        onClick={this._signUp}
                        value="New Account"
                    />
                    <InputSubmit
                        type="submit"
                        onClick={this._showHome}
                        value="Back"
                    />
                </Form>
            )
        }
    }


    render() {
        const colors = this.props.store.getState().colors
        return (
            <Page
                className="logginPage"
                color={colors}
            >
                <Logo>
                    <p>GO EXPLORE</p>
                </Logo>
                {this._whichView()}
            </Page>
        )
    }
}