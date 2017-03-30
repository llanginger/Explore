import * as React from "react"
import * as axios from "axios"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import * as Transition from 'react-inline-transition-group';

import { BaseReduxProps } from "../Interfaces"
import {
    BottomArea,
    BottomButtons,
    HomeInput,
    Hamburger,
    ExploreMap,
    InfoCard,
    Overlay,
    SettingsMenu,
    PreferencesPage,
    PreferencesContainer,
    LoginPage
} from "./Components"


let init_lng = -98.5795
let init_lat = 39.8282

interface BodyProps extends BaseReduxProps {
}

export class Body extends React.Component<BodyProps, any> {
    private hello: string;
    private unsubscribe: Function;
    constructor(props) {
        super(props)
        this.hello = "hello"
    }

    componentDidMount() {
        const { store } = this.props;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate()
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        const { store } = this.props

        const storeRef = store.getState()

        // --- Set up reducer shortcuts --- //
        const showOverlay = storeRef.initState.showOverlay
        const venues = storeRef.currentResults.venues
        const showBottomArea = storeRef.bottomArea.show
        const showPreferecesPage = storeRef.settingsPages.page
        const showSettingsMenu = storeRef.settingsMenu
        const showLoginPage = storeRef.loggedIn

        // --- Set up render conditionals --- //
        const renderOverlay = () => {
            if (showOverlay === true) {
                return (<Overlay key={1} store={store} />)
            } else {
                return
            }
        }
        const renderBottomArea = () => {
            if (showBottomArea === true && venues.length > 0) {
                return <BottomArea store={store} />
            } else {
                return
            }
        }

        const renderSettingsMenu = () => {
            if (showSettingsMenu.open === true) {
                return <SettingsMenu store={store} />
            } else {
                return
            }
        }

        // const renderPrefsPage = () => {
        //     if (showPreferecesPage !== "closed") {
        //         return <PreferencesContainer store={store} page={showPreferecesPage} />
        //     } else {
        //         return <div />
        //     }
        // }

        // --- STYLES --- //

        const burgerStyles = {
            position: "absolute",
            top: "5px",
            left: "5px",
            filter: "drop-shadow(5px 5px 5px #333)"
        }

        const whichView = () => {
            if (showLoginPage.loggedIn === true) {
                return (
                    <div style={{
                        height: "100%",
                        width: "100%"
                    }}>
                        <div
                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                zIndex: 500,
                                backgroundColor: "#333",
                                filter: showSettingsMenu.open ? "opacity(0.5)" : "opacity(0)",
                                transition: "all .5s linear",
                                pointerEvents: "none"
                            }}
                        />
                        <ExploreMap
                            styles={{
                                height: "100%",
                                width: "100%"
                            }}
                            className="mapiv"
                            store={store}
                            init_lat={init_lat}
                            init_lng={init_lng}
                        />
                        <ReactCSSTransitionGroup
                            transitionName="overlayFade"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}
                            transitionAppear={true}
                            transitionAppearTimeout={1200}
                        >
                            {renderOverlay()}
                        </ReactCSSTransitionGroup>
                        <Hamburger
                            store={store}
                            styles={burgerStyles}
                        />
                        <HomeInput
                            style={{ marginTop: "100px" }}
                            placeholder="What Would You Like?"
                            store={store}
                        />
                        <InfoCard store={store} />
                        <ReactCSSTransitionGroup
                            transitionName="settingsMenuLoad"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}
                        >
                            {renderSettingsMenu()}
                        </ReactCSSTransitionGroup>
                        <BottomButtons store={store} />
                        <ReactCSSTransitionGroup
                            transitionName="bottomAreaRise"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}
                        >
                            {renderBottomArea()}
                        </ReactCSSTransitionGroup>

                        <PreferencesContainer store={store} />
                    </div>
                )
            } else {
                return <LoginPage store={store} />
            }
        }


        return (
            <div
                id="mainApp"
                style={{
                    position: "relative",
                    width: "375px",
                    height: "667px",
                    marginLeft: "100px",
                    overflow: "hidden"
                }}>

                {whichView()}
            </div>
        )

    }
}





