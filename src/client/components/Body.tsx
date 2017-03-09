import * as React from "react"
import * as axios from "axios"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { BaseReduxProps } from "../Interfaces"
import { BottomArea, BottomButtons, HomeInput, Hamburger, ExploreMap, InfoCard } from "./Components"


let init_lng = -98.5795
let init_lat = 39.8282
let nps_url = "https://raw.githubusercontent.com/gizm00/blog_code/master/appendto/react_nps/np.geojson"

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
		return(
			<div
				id="mainApp"
				style={{
					position: "relative",
					width: "375px",
					height: "667px",
					marginLeft: "100px",
					overflow: "hidden"
			}}>
				<div
					style={{
						position: "absolute",
						width: "100%",
						height: "70%",
						backgroundColor: "yellow"
					}}
				>
				</div>
				<ExploreMap
					styles={{
						height: "100%",
						width: "100%"
					}}
					className="mapiv"
					store={ store }
					init_lat={init_lat}
					init_lng={init_lng}
					nps_source={nps_url}
				/>
				<HomeInput
					style={{marginTop: "100px"}}
					placeholder="What Would You Like?"
					store={ store }
				/>
				<InfoCard store={ store }/>
				<BottomButtons store={ store } />
				<BottomArea store={ store }/>
				
			</div>
		)

	}
}

{/*<Hamburger
				store={props.store}
				styles={{
					position: "absolute",
					top: "5px",
					left: "5px",
					filter: "drop-shadow(5px 5px 5px #333)"
				}}
			/>*/}