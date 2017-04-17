import * as React from "react"
import axios from "axios"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import * as Transition from 'react-inline-transition-group';
import styled from "styled-components"
import { BaseReduxProps } from "../Interfaces"
import { OVERLAY_CLICKED } from "../actions/actions"
import {
    BottomArea,
    BottomButtons,
    HomeInput,
    Hamburger,
    ExploreMap,
    DarkOverlay,
    InfoCard,
    Overlay,
    SettingsMenu,
    PreferencesPage,
    PreferencesContainer,
    LoginPage,
    GPSButton
} from "./Components"
import { ColorPicker } from "./ColorPicker"

const ContentContainer = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;

    & > * {
        pointer-events: all;
    }

    @media(min-width: 700px) {
        width: 700px;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
    }
`

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
        const showDarkOverlay = storeRef.overlay.showOverlay

        // --- Set up render conditionals --- //
        const renderOverlay = () => {
            if (showOverlay === true) {
                return (<Overlay key={1} store={store} />)
            } else {
                return
            }
        }

        const renderDarkOverlay = () => {
            if (showDarkOverlay === true) {
                return (<DarkOverlay
                    active={showDarkOverlay}
                    store={store}
                />)
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

        const whichView = () => {
            if (showLoginPage.loggedIn === true) {
                return (
                    <div style={{
                        height: "100%",
                        width: "100%"
                    }}>
                        <DarkOverlay
                            active={showDarkOverlay}
                            store={store}
                        />
                        <ExploreMap
                            className="mapiv"
                            store={store}
                        />
                        <ReactCSSTransitionGroup
                            transitionName="settingsMenuLoad"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}
                        >
                            {renderSettingsMenu()}
                        </ReactCSSTransitionGroup>

                        <Overlay store={store} />
                        <Hamburger
                            store={store}
                        />
                        <ContentContainer>
                            <HomeInput
                                style={{ marginTop: "100px" }}
                                placeholder="What Would You Like?"
                                store={store}
                            />
                            <InfoCard store={store} />
                            <BottomButtons store={store} />
                            <ReactCSSTransitionGroup
                                transitionName="bottomAreaRise"
                                transitionEnterTimeout={300}
                                transitionLeaveTimeout={300}
                            >
                                {renderBottomArea()}
                            </ReactCSSTransitionGroup>
                            <GPSButton store={store} />
                            <PreferencesContainer store={store} />
                        </ContentContainer>
                        <ColorPicker store={store} />
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





