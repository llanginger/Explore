import * as React from "react"
import * as ReactDOM from "react-dom"

const MainBody = (props) => {
	return(
		<div
			id="mainApp"
			style={{
				position: "relative",
				width: "375px",
				height: "667px",
				marginLeft: "100px"
		}}>
			<Hello name={"John"}/>
		</div>
	)
}

const Hello = (props) => {
	return (
		<div>
			Hello {props.name}
		</div>
	)
}



ReactDOM.render(<MainBody />, document.getElementById("app"))
