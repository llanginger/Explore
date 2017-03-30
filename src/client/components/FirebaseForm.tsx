import * as React from "react"
import * as firebase from "firebase"

export interface FirebaseFormProps {
    dbTarget: string;
    onSubmit: Function;
    inputName: string;
    inputPlaceholder: string;
    buttonName: string;
    style?: {}
}

export class FirebaseForm extends React.Component<FirebaseFormProps, any> {
    private input;
    private user;
    private database;
    constructor(props) {
        super(props)
        this._handleSubmit = this._handleSubmit.bind(this)
        this.state = { inputName: this.props.inputName }
        this.user = firebase.auth().currentUser
    }

    componentDidMount() {
        const target = this.props.dbTarget
        const newState = firebase.database().ref("users/" + this.user.uid).once("value").then((snap) => {
            this.setState({ inputName: snap.val().target })
        })
    }

    _handleSubmit(e) {
        this.props.onSubmit(this.input.value)

        firebase.database().ref("users/" + this.user.uid).set({
            input: this.input.value
        })

        e.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this._handleSubmit}>
                <label value={this.props.inputName} />
                <input
                    type="text"
                    ref={(input) => this.input = input}
                    placeholder={this.state.inputPlaceholder}
                />
                <input type="submit" value={this.props.buttonName} />
            </form>
        )
    }
}