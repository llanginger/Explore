import * as React from "react"
import { Menu, MenuItem, MenuDivider, Checkbox } from "@blueprintjs/core";


export class ResultsMenu extends React.Component<any, any> {

    constructor(props) {
        super(props)
    }

    public render() {
        const venues = this.props.store.currentResults
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
        const venues = this.props.store.currentResults

        if (venues.results.length > 0) {
            return (
                <Menu>
                    {this.mapPropsToChildren(venues)}
                </Menu>
            )
        } else {
            return
        }
    }
    public mapPropsToChildren(venues) {
        return venues.results.map((item, i) => {
            return (
                <MenuItem
                    iconName="pt-icon-dot"
                    onClick={this.handleClick}
                    text={item.name}
                    key={i}
                />
            )
        })
    }
 
    private handleClick(e) {
        console.log("clicked", (e.target as HTMLElement).textContent);
    }
}