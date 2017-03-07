import * as React from "react"
import { HomeInput } from "./Input"
import { Hamburger } from "./Hamburger"
import { ExploreMap } from "./ExploreMap"
import { BaseReduxProps } from "../Interfaces"
import * as axios from "axios"

let init_lng = -98.5795
let init_lat = 39.8282
let nps_url = "https://raw.githubusercontent.com/gizm00/blog_code/master/appendto/react_nps/np.geojson"

interface BodyProps extends BaseReduxProps {

}

export const Body = (props) => {

	const { store } = props.store

	return(
		<div
			id="mainApp"
			style={{
				position: "relative",
				width: "375px",
				height: "667px",
				marginLeft: "100px"
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
					height: "80%",
					width: "100%"
				}}
				className="mapiv"
				store={props.store}
				init_lat={init_lat}
				init_lng={init_lng}
				nps_source={nps_url}
			/>
			<HomeInput
				style={{marginTop: "100px"}}
				placeholder="What Would You Like?"
				store={props.store}
			/>
			
		</div>
	)
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