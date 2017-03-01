// This needs to be a popover instead

// Todo for Tuesday: Hook up sub menu to input

import * as classNames from "classnames";
import * as React from "react"
import * as axios from "axios"

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

import { ResultsMenu } from "./ResultsMenu"

export interface InputGroupState {
	disabled?: boolean;
	filterValue?: string;
	large?: boolean;
	showPassword?: boolean;
	tagValue?: string;
}

const HomeInputContainerStyles = {
	position: "absolute",
	top: "100px",
	width: "90%",
	left: "5%",
	boxShadow: "5px 5px 5px #333"
}

const clearButton = (store) => {
	return (
		<Button 
			iconName="pt-icon-delete"
			onClick={() => {
				store.dispatch({
					type: "CLEAR_VENUES"
				})
			}}
		/>
	)
}

export class HomeInput extends React.Component <any, any> {
	private unsubscribe: Function;

	constructor(props) {
		super(props);
		this.state = {
			category: "",
			near: "Seattle",
			limit: 10
		}

		this._queryFourSquare = this._queryFourSquare.bind(this)
	}

	_queryFourSquare() {
		this.props.store.dispatch({
		type: "FETCHING_VENUES",
		payload: "Spinner?"
		})
		axios.get("queryFourSquare", {params: this.state})
			.then((response) => {
				console.log("FourSquare response: ", response.data)
				this.props.store.dispatch({
					type: "FETCHED_VENUES",
					payload: {
						queryInfo: this.state,
						results: response.data
					}
				})
			})
	}

	componentDidMount() {
		const { store } = this.props;
		this.unsubscribe = store.subscribe(() => {
			this.forceUpdate()
		})
	}

	componentWillUnmount() {
		this.unsubscribe();
	}


	render() {
		const props = this.props
		const state = this.state
		const { store } = props
		const { category } = state

		const handleInputChange = (event) => {
			this.setState({ category: event.target.value})
			// console.log(state)
			console.log("store: ")
			console.log(store.getState())
			// console.log({thing1: "thing1", thing2: "thing2"})
		}

		const handleKeyDown = (event) => {
			if (event.keyCode === 13) {
				this._queryFourSquare()
			}
		}

		return (
			<div 
				className="inputGroup"
				style={HomeInputContainerStyles}
			>
				<InputGroup
					className="pt-large testInput"
					intent={Intent.PRIMARY}
					leftIconName="pt-icon-shop"
					rightElement={clearButton(store)}
					placeholder={props.placeholder}
					value={state.category}
					disabled={false}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
				/>
				<ResultsMenu store={store.getState()}/>
			</div>
		)
	}


}











