import * as React from "react"
import { InputTest } from "./Input"
import { Hamburger } from "./Hamburger"
import { MapElement } from "./NewMap"
import { 
	queryFourSquare, 
	getFourSquarePhotos, 
	getFourSquareReviews,
	testRequest,
	Query, 
	Venue 
} from "../queryFoursquare"

const fakeArray = [
	"Thing 1",
	"Thing 2",
	"Thing 3",
	"Thing 4"
]

// const FSOne = queryFourSquare({
// 	near: "Seattle",
// 	category: "Donuts",
// 	limit: 10
// })

// console.log("FSOne: ", FSOne)

// const FSTwo = getFourSquarePhotos(FSOne)

// console.log("FSTwo: ", FSTwo)

testRequest({
	params: {
		near: "Seattle",
		category: "Donuts",
		limit: 10	
	}
})

let init_lng = -98.5795
let init_lat = 39.8282
let nps_url = "https://raw.githubusercontent.com/gizm00/blog_code/master/appendto/react_nps/np.geojson"

export const Body = (props) => {
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
			<MapElement
				styles={{
					height: "80%",
					width: "100%"
				}}
				className="mapiv"
				init_lat={init_lat}
				init_lng={init_lng}
				nps_source={nps_url}
			/>
			<InputTest
				style={{marginTop: "100px"}}
				placeholder={"What Do You Want?"}
				disabled={false}
			/>
			<Hamburger
				store={props.store}
				styles={{
					position: "absolute",
					top: "5px",
					left: "5px",
					filter: "drop-shadow(5px 5px 5px #333)"
				}}
			/>
		</div>
	)
}
