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


export class ResultsMenu extends React.Component<any, any> {

    constructor(props) {
        super(props)
    }

    public render() {
        
        const venues = this.props.store.getState().currentResults
        console.log("Menu props: ", this.props)
        console.log("last store results: ", venues)

        return (
            <div>
                {this.makeMenu()}
            </div>
        );
    }

    public removeVenue() {

    }

    

    public makeMenu() {
        const venues = this.props.store.getState().currentResults
        const inputState = this.props.store.getState().homeInputState

        if (venues.results.length > 0 && inputState.active === true) {
            return (
                <div>
                     <Menu className="resultsMenu">
                        {this.showInputToolTip()}
                        {this.mapVenuesToMenuItems(venues)}
                    </Menu>
                    {this.letsGoButton()}
                </div>
            )
        } else {
            return
        }
    }

    public letsGoButton() {
        return (
            <Button 
                text="Let's go!"
                className="pt-fill"
                intent={Intent.SUCCESS}
                onClick={() => {
                    this.props.store.dispatch({
                        type: "BLUR_INPUT"
                    })
                }}
            />
        )
    }

    public showInputToolTip() {
        const { store } = this.props
        if (store.getState().initState.showMainInputHelp === true) {
            return (
                <div>
                <MenuItem
                    text="Click to remove places you've been"
                    intent={Intent.SUCCESS}
                    iconName="pt-icon-help"
                    onClick={() => {
                        store.dispatch({
                            type: "DISMISS_MAIN_INPUT_HELP"
                        })
                    }}
                />
                <MenuDivider />
                </div>
            )
        } else {
            return
        }
    }

    public mapVenuesToMenuItems(venues) {
        const { store } = this.props
        const visitedId = store.getState().visitedVenues.visitedIds
        return venues.results.map((venue, i) => {
            if (venue.visited && venue.visited === true || visitedId.indexOf(venue.id) !== -1) {
                return
            } else {
                /*return (
                    <MenuItem
                        iconName="pt-icon-dot"
                        onClick={this.visitedVenue(venue)}
                        text={venue.name}
                        key={i}
                    />
                )   */
                return (
                    <div 
                        style={{
                            margin: "1%",
                            width: "48%",
                            height: "150px",
                            padding: "10px",
                            backgroundImage: "url('" + venue.photoSrc[0] + "')"
                        }}
                        onClick={this.visitedVenue(venue)}
                    >
                        <span
                            style={{
                                color: "white",
                                background: "purple",
                                padding: "2px"      
                            }}
                        >{venue.name}</span>                        
                    </div>
                )
            }
        })
    }

    public visitedVenue = (venue) => () => {
        this.props.store.dispatch({
            type: "VISITED_VENUE",
            venue: venue,
            id: venue.id
        })
    }
 
}