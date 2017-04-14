import * as React from "react"
import styled from "styled-components";
import { Colors } from "../Interfaces"

interface ColorPickerFormProps {
    onSubmit: (color: Colors) => void;
    placeholder: string;
    colorType: string;
}

export class ColorPickerForm extends React.Component<ColorPickerFormProps, any> {

    private input;
    constructor(props) {
        super(props)
        this._onSubmit = this._onSubmit.bind(this)

    }

    _onSubmit(e) {
        e.preventDefault()
        const colorString = this.input.value;
        const submitObj: Colors = { [this.props.colorType]: colorString }
        this.props.onSubmit(submitObj)
        console.log("Color Picker form submitted with: ", submitObj);
    }

    render() {
        const props = this.props
        return (
            <form onSubmit={this._onSubmit}>
                <div>{this.props.placeholder}</div>
                <input
                    type="text"
                    placeholder={props.placeholder}
                    ref={input => this.input = input}
                />
            </form>
        )
    }
}