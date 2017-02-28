import * as React from "react"
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";

export class ResultsMenu extends React.Component<any, any> {

    constructor(props) {
        super(props)

        this.state = {
            items: ["123", "456"]
        }
    }

    componentWillReceiveProps() {
        // console.log("Will receive: " + this.props.store.getState())
    }


    public render() {
        const FSR = this.props.store.fourSquareResults
        console.log("Menu props: ", this.props)
        console.log("last store results: ", FSR[FSR.length-1])

        return (
            <Menu>
                {this.mapPropsToChildren()}
            </Menu>
        );
    }

    public mapPropsToChildren() {
        const FSR = this.props.store.fourSquareResults
        if (FSR.length > 1) {
            return FSR[FSR.length-1].results.map((item, i) => {
                return (
                    <MenuItem
                        iconName="new-text-box"
                        onClick={this.handleClick}
                        text={item.name}
                        key={i}
                    />
                )
            })
        } else {
            return
        }
        
    }
 
    private handleClick(e) {
        console.log("clicked", (e.target as HTMLElement).textContent);
    }
}