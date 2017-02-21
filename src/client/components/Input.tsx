import * as classNames from "classnames";
import * as React from "react"
import {
    Button,
    Classes,
    InputGroup,
    Intent,
    Menu,
    MenuItem,
    Popover,
    Position,
    Spinner,
    Switch,
    Tag,
    Tooltip,
} from "@blueprintjs/core";

export interface InputGroupState {
	disabled?: boolean;
	filterValue?: string;
	large?: boolean;
	showPassword?: boolean;
	tagValue?: string;
}

const styles = {
	marginTop: "100px"
}

export class InputTest extends React.Component <any, InputGroupState> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<InputGroup
					className="pt-large testInput"
					intent={Intent.SUCCESS}
					leftIconName="filter"
					placeholder={this.props.placeholder}
					disabled={this.props.disabled}
			/>
		)
	}

}
