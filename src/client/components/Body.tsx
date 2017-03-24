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
    PreferencesPage
} from "./Components"


let init_lng = -98.5795
let init_lat = 39.8282

interface BodyProps extends BaseReduxProps {

}

export class Body extends React.Component<BodyProps, any> {

    private unsubscribe: Function;
    constructor(props) {
        super(props)
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

        // --- Set up reducer shortcuts --- //
        const showOverlay = store.getState().initState.showOverlay
        const venues = store.getState().currentResults.venues
        const showBottomArea = store.getState().bottomArea.show
        const showPreferecesPage = store.getState().settingsPages.preferences
        const showSettingsMenu = store.getState().settingsMenu

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

        const renderPrefsPage = () => {
            if (showPreferecesPage.open === true) {
                return <PreferencesPage store={store} />
            } else {
                return <div />
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
                    styles={{
                        position: "absolute",
                        top: "5px",
                        left: "5px",
                        filter: "drop-shadow(5px 5px 5px #333)"
                    }}
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
                {renderPrefsPage()}
            </div>
        )

    }
}





