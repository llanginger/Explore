import * as React from "react"
import * as classNames from "classNames"


export class Hamburger extends React.Component<any, any> {

	private unsubscribe: Function;
	constructor(props) {
		super(props)
		this.state = {
			isActive: false
		}
		this._isActive = this._isActive.bind(this);
	}

	componentDidMount() {
		// Set up redux subscription
    const { store } = this.props;
		console.log("logging store from hamburger: ", store)
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
  }

	componentWillUnmount() {
		// Set up redux unsubscription
    this.unsubscribe();
  }

	_isActive() {
		return "c-hamburger c-hamburger--htx" + (this.props.store.getState().settingsMenu === "OPEN_MENU" ? " is-active" : "")

	}

	render() {
		return(
			<button
				style={ this.props.styles }
				onClick={() => {
					if ( this.props.store.getState().settingsMenu === "CLOSE_MENU" ) {
						this.props.store.dispatch({
							type: "OPEN_MENU"
						})
					} else {
						this.props.store.dispatch({
							type: "CLOSE_MENU"
						})
					}
					console.log(this.props.store.getState())
				}}
				className={this._isActive()}
			>
			  <span>toggle menu</span>
			</button>
		)
	}

}
