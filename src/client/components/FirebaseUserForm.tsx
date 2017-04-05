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
    isActive: boolean;
}


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
    }


    _handleSubmit(e) {
        e.preventDefault()
        const target = this.props.profileTarget

        if (target === "password") {
            console.log("Preinput: ", this.preInput.value);
            const credential = firebase.auth.EmailAuthProvider.credential(
                this.user.email,
                this.preInput.value
            );
            console.log("Credential: ", credential)

            this.user.reauthenticate(credential).then(() => {
                this.user.updatePassword(this.input.value).then(() => {
                    console.log("Password updated!")
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
        e.preventDefault()
    }


    render() {

        const addInput = () => {
            if (this.props.profileTarget === "password") {
                return (
                    <ExtraInput
                        type="text"
                        innerRef={(input) => this.preInput = input}
                        placeholder="Old password"
                    />
                )
            } else {
                return null
            }
        }

        const Input = styled.input`
            width: 90%;
            padding: 10px;
            border: 2px #669EFF solid;
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
            background: #669EFF;
            border: 2px #669EFF solid;
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
                    type="text"
                    innerRef={(input) => this.input = input}
                    placeholder={choosePlaceholder()}
                />
                <Button
                    type="submit"
                    value={this.props.buttonName}
                >
                    <IconSpan className="pt-icon pt-icon-tick" ></IconSpan>
                </Button>
            </Form>
        )
    }
}