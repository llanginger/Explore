import * as React from "react"
import { Menu, MenuItem, MenuDivider, Checkbox, Button, Intent } from "@blueprintjs/core";


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
                     <Menu>
                        {this.mapPropsToChildren(venues)}
                    </Menu>
                    <Button 
                        text="Let's go!"
                        className="pt-fill"
                        intent={Intent.SUCCESS}
                    />
                </div>
            )
        } else {
            return
        }
    }
    public mapPropsToChildren(venues) {

        return venues.results.map((venue, i) => {
            if (venue.visited && venue.visited === true) {
                return
            } else {
                return (
                    <MenuItem
                        iconName="pt-icon-dot"
                        onClick={() => {
                            this.props.store.dispatch({
                                type: "VISITED_VENUE",
                                id: venue.id
                            })
                        }}
                        text={venue.name}
                        key={i}
                    />
                )   
            }
        })
    }
 
    public handleClick(e) {
        // this.props.store.dispatch({
        //     type: "BLUR_INPUT"
        // })
        // console.log("Handle click props: ", this.props.store.getState())
        console.log("clicked", (e.target as HTMLElement).textContent);
    }
}