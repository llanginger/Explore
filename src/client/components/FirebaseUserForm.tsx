import * as React from "react"
import * as firebase from "firebase"
import styled from "styled-components"

export interface UserFormProps {
    profileTarget: string;
    inputPlaceholder: string;
    buttonName: string;
    style?: {}
}

interface UserFormState {
    buttonGreen: boolean
}

interface BProps {
    isGreen: boolean
}

const Input = styled.input`
    width: 90%;
    padding: 10px;
    border: ${(props: BProps) => props.isGreen ? "2px #2BC016 solid" : "2px #669EFF solid"} ;
    border-right: none;

    &:focus {
        outline: none;
    }
`

const ExtraInput = styled(Input) `
    width: 100%;
    border: 2px #669EFF solid;
`

const Button = styled.button`
    width: 10%;
    height: 100%;
    color: white;
    padding: 10px;
    background: ${(props: BProps) => props.isGreen ? "#2BC016" : "#669EFF"};
    border: ${(props: BProps) => props.isGreen ? "2px #2BC016 solid" : "2px #669EFF solid"} ;
    cursor: pointer;

    &:focus {
        outline: none;
    }

    &:active {
        background: #336BCC;
        border: 2px #336BCC solid;
    }
`

const Form = styled.form`
    margin-bottom: 10px;
    width: 100%;
`

const IconSpan = styled.span`
    font-size: 14px;
`
export class FirebaseUserForm extends React.Component<UserFormProps, UserFormState> {
    private preInput
    private input;
    private user;
    private database;
    private isActive
    constructor(props) {
        super(props)
        this._handleSubmit = this._handleSubmit.bind(this)
        this.user = firebase.auth().currentUser
        this.state = {
            buttonGreen: false
        }
    }


    _handleSubmit(e) {
        e.preventDefault()
        const target = this.props.profileTarget

        if (target === "password") {
            const oldPass = this.preInput.value
            const newPass = this.input.value
            console.log("Preinput: ", oldPass);
            console.log("Input: ", newPass);
            const credential = firebase.auth.EmailAuthProvider.credential(
                this.user.email,
                oldPass
            );
            console.log("Credential: ", credential)

            this.user.reauthenticate(credential).then(() => {
                this.user.updatePassword(newPass).then(() => {
                    console.log("Password updated to: ", newPass)
                })
            })
        } else if (target === "email") {
            this.user.updateEmail(this.input.value).then(() => {
                console.log("Updated email: ", this.user);
            })
        } else {
            this.user.updateProfile({ [target]: this.input.value }).then(() => {
                console.log("Updated: ", target, " ", this.user);
            })
        }
        this.setState({ buttonGreen: true })
        this.input.blur()
        e.preventDefault()
    }


    render() {
        if (this.state.buttonGreen === true) {
            setTimeout(() => {
                this.setState({ buttonGreen: false })
            }, 1500)
        }
        const addInput = () => {
            if (this.props.profileTarget === "password") {
                return (
                    <ExtraInput
                        type="password"
                        innerRef={(input) => this.preInput = input}
                        placeholder="Old password"
                        isGreen={this.state.buttonGreen}
                    />
                )
            } else {
                return null
            }
        }

        const choosePlaceholder = () => {
            if (this.props.profileTarget !== "password") {
                return this.user[this.props.profileTarget]
            } else {
                return this.props.inputPlaceholder
            }
        }
        return (
            <Form
                onSubmit={this._handleSubmit}
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                {addInput()}
                <Input
                    type={this.props.profileTarget === "password" ? "password" : "text"}
                    innerRef={(input) => this.input = input}
                    placeholder={choosePlaceholder()}
                    isGreen={this.state.buttonGreen}
                />
                <Button
                    type="submit"
                    value={this.props.buttonName}
                    isGreen={this.state.buttonGreen}
                >
                    <IconSpan className="pt-icon pt-icon-tick" ></IconSpan>
                </Button>
            </Form>
        )
    }
}