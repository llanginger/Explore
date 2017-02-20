import * as React from "react"
import * as ReactDOM from "react-dom"

const Hello = (props) => {
	return (
		<div>
			Hello {props.name}
		</div>
	)
}

ReactDOM.render(<Hello name={"Barry"} />, document.getElementById("app"))
