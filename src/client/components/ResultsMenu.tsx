import * as React from "react"
import {
    Menu,
    MenuItem,
    MenuDivider,
    Checkbox,
    Button,
    Intent,
    Spinner
} from "@blueprintjs/core";
import { ResultItem } from "./ResultItem"
import { BaseReduxProps, Venue } from "../Interfaces"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { LETS_GO, DISMISS_MAIN_INPUT_HELP } from "../actions/actions"


export class ResultsMenu extends React.Component<BaseReduxProps, any> {

    constructor(props) {
        super(props)
    }

    public render() {
        return (
            <div>
                {this.makeMenu()}
            </div>
        );
    }

    public makeMenu() {
        const venues: Venue[] = this.props.store.getState().currentResults.venues
        const inputState = this.props.store.getState().homeInputState
        const menuStyles = {
            display: "flex",
            flexWrap: "wrap",
            maxHeight: "350px",
            overflowY: "scroll",
            margin: "0",
            borderRadius: "3px",
            background: "#FFFFFF",
            minWidth: "180px",
            padding: "5px 0px 5px 0px",
            listStyle: "none",
            textAlign: "left",
            color: "#182026"
        }



        if (venues.length > 0 && inputState.active === true) {
            return (
                <div>
                    <div style={menuStyles} className="resultsMenu">
                        {this.showInputToolTip()}
                        <ReactCSSTransitionGroup
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                width: "100%"
                            }}
                            className="resultsMenuTransitionGroup"
                            transitionName="fade"
                            transitionEnterTimeout={200}
                            transitionLeaveTimeout={200}
                        >
                            {this.mapVenuesToMenuItems(venues)}
                        </ReactCSSTransitionGroup>
                    </div>
                    {this.letsGoButton()}
                </div>
            )
        } else {
            return
        }
    }

    private getNextVenue = (venues) => {
        for (let venue of venues) {
            if (venue.seen === false && venue.visited !== true) {
                return venue
            }
        }
    }

    private letsGoButton() {
        const venues: Venue[] = this.props.store.getState().currentResults.venues

        return (
            <Button
                text="Let's go!"
                className="pt-fill"
                intent={Intent.SUCCESS}
                onClick={() => {
                    this.props.store.dispatch(LETS_GO(this.getNextVenue(venues)))
                }}
            />
        )
    }

    public showInputToolTip() {
        const { store } = this.props
        if (store.getState().initState.showMainInputHelp === true) {
            return (
                <div style={{
                    width: "100%"
                }}>
                    <MenuItem
                        text="Click to remove places you've been"
                        intent={Intent.SUCCESS}
                        iconName="pt-icon-help"
                        onClick={() => {
                            store.dispatch(DISMISS_MAIN_INPUT_HELP())
                        }}
                    />
                    <MenuDivider />
                </div>
            )
        } else {
            return <div />
        }
    }

    public mapVenuesToMenuItems(venues: Venue[]) {
        const { store } = this.props
        const visitedId = store.getState().visitedVenues.visitedIds
        return venues.map((venue, i) => {
            if (venue.visited && venue.visited === true || visitedId.indexOf(venue.id) !== -1) {
                return
            } else {
                return (
                    <ResultItem venue={venue} store={store} key={i} />
                )
            }
        })
    }
}