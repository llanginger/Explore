// This needs to be a popover instead

// Todo for Tuesday: Hook up sub menu to input

import * as classNames from "classnames";
import * as React from "react"
import * as axios from "axios"
import { BaseReduxProps } from "../Interfaces"

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

interface InputProps extends BaseReduxProps {
	placeholder: string;
	style: {}
}

interface HomeInputState {
	category: string;
	near: string;
	limit: number;
	inputActive: boolean;
}

export class HomeInput extends React.Component <InputProps, HomeInputState> {
	private unsubscribe: Function;
	private homeInput: HTMLElement

	constructor(props) {
		super(props);
		this.state = {
			category: "",
			near: "Seattle",
			limit: 40,
			inputActive: false
		}

		this._queryFourSquare = this._queryFourSquare.bind(this)
	}

	_queryFourSquare() {
		const params = { params: {
			category: this.state.category,
			near: this.state.near,
			limit: this.state.limit
		}}
		this.props.store.dispatch({
		type: "FETCHING_VENUES",
		payload: "Spinner?"
		})
		axios.get("queryFourSquare", params)
			.then((response) => {
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
		const inputState = store.getState().homeInputState.active
		const spinnerState = store.getState().spinner

		const handleInputChange = (event) => {
			this.setState({ category: event.target.value})
			// console.log(state)
			// console.log({thing1: "thing1", thing2: "thing2"})
		}
		const formatString = (string) => {
			return string.charAt(0).toUpperCase() + string.slice(1)
		}
		const handleKeyDown = (event) => {
			if (event.keyCode === 13) {
				this.setState({ category: formatString(this.state.category)})
				this._queryFourSquare()
			}
		}

		const handleInputClick = () => {
			if (this.state.inputActive === false) {
				store.dispatch({
					type: "FOCUS_INPUT"
				})
			} else {
				return
			}
		}

		const clearButton = (store) => {
			if (this.state.category.length > 0) {
				return (
					<Button 
						iconName="pt-icon-delete"
						onClick={() => {
							this.setState({ category: ""})
							store.dispatch({
								type: "CLEAR_VENUES"
							})
							this.homeInput.focus()
						}}
					/>
				)
			}
		}

		const HomeInputContainerStyles = {
			position: "absolute",
			top: inputState ? "0px" : "11%",
			width: inputState ? "100%" : "90%",
			left: inputState ? "0px" : "5%",
			boxShadow: inputState ? "" : "5px 5px 5px #333",
			transition: "all, .3s"
		}

		const displaySpinner = () => {
			if (spinnerState === true) {
				return (
					<Spinner
						intent={Intent.PRIMARY}
						className={"centerAbsolute marginTop50P pt-large"}
					/>
				)
			} else {
				return
			}
		}

		return (
			<div 
				className="inputGroup"
				style={HomeInputContainerStyles}
			>
				<InputGroup
					className="pt-large testInput"
					onClick={handleInputClick}
					intent={Intent.PRIMARY}
					leftIconName="pt-icon-shop"
					rightElement={clearButton(store)}
					inputRef={ (input) => this.homeInput = input }
					placeholder={props.placeholder}
					value={state.category}
					disabled={false}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
				/>
				<ResultsMenu store={store}/>
				{displaySpinner()}
			</div>
		)
	}


}











