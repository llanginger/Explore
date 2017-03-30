import * as React from "react"
import * as firebase from "firebase"

export interface FirebaseUserFormProps {
    profileTarget: string;
    inputName: string;
    inputPlaceholder: string;
    buttonName: string;
    style?: {}
}

export class FirebaseUserForm extends React.Component<FirebaseUserFormProps, any> {
    private input;
    private user;
    private database;
    constructor(props) {
        super(props)
        this._handleSubmit = this._handleSubmit.bind(this)
        this.user = firebase.auth().currentUser
        this._getTargetValue = this._getTargetValue.bind(this)
    }


    _getTargetValue() {
        const target = this.props.profileTarget
        if (this.user.displayName) {
            return firebase.auth().currentUser[target]
        } else {
            return "No " + target + " set!"
        }
    }

    _handleSubmit(e) {
        const target = this.props.profileTarget
        this.user.updateProfile({ [target]: this.input.value })
        e.preventDefault()
    }

    render() {

        const inputStyles = {
            width: "100%",
            padding: "5px",
            borderRadius: "5px"
        }

        const formStyles = {
            marginBottom: "10px"
        }
        return (
            <form
                style={formStyles}
                onSubmit={this._handleSubmit}
                onClick={(e) => { e.stopPropagation() }}
            >
                <label >{this.props.profileTarget + ": " + this._getTargetValue()} </label>
                <input
                    type="text"
                    ref={(input) => this.input = input}
                    placeholder={this.props.inputPlaceholder}
                    style={inputStyles}
                />
                <button type="submit" value={this.props.buttonName}><span className="pt-icon-standard pt-icon-manual"></span></button>
            </form>
        )
    }
}