import * as React from "react"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { BaseReduxProps } from "../Interfaces"
import { CLOSE_SETTINGS_PAGE } from "../actions/actions"
import styled from "styled-components"
import { FirebaseUserForm, Reusable } from "./Components"
import * as firebase from "firebase"

const tempImgUrl = "https://www.activarcpg.com/sites/default/files/product-images/VLFPVC-OPEN%20600x600.jpg"

export const AccountPage = (props) => {

    const changeUserName = (e) => {
        e.stopPropagation()
        const userName = firebase.auth().currentUser.displayName
    }

    const AccountList = styled(Reusable.MainList) `
        padding: 0px;
    `

    const Pic = styled.img`
        height: 100%;
        width: 100%;
    `

    const Item = styled.li`
        background: #999;
        margin: 0px 0px 10px 0px;
        display: flex;
        align-items: center;
        padding: 15px;
        box-sizing: border-box;
    `

    const InputItem = styled(Item) `
        flex-direction: column;
    `

    const Info = styled.div`
        width: 100%;
        color: white;
        margin-bottom: 10px;
    `

    const PicContainer = styled.div`
        box-sizing: boder-box;
        border: 2px solid #669EFF;
        background: white;
        height: 125px;
        width: 125px;
        margin: 0px 10 0px 0px;
        flex-shrink: 0;
    `

    const PicUpdater = styled.div`
        height: 125px;
        width: 100%;
        margin-left: 10px;
        background: white;
    `



    return (

        <Reusable.Page
        >
            <Reusable.TopBar onClick={props.onClick} text="Account Page" />
            <AccountList>
                <Item>
                    <PicContainer>
                        <Pic src={tempImgUrl} />
                    </PicContainer>
                </Item>
                <InputItem>
                    <Info>
                        Update your Username:
                    </Info>
                    <FirebaseUserForm
                        inputPlaceholder="Username"
                        buttonName="Submit"
                        profileTarget="displayName"
                    />
                </InputItem>
                <InputItem>
                    <Info>
                        Update your Email:
                    </Info>
                    <FirebaseUserForm
                        inputPlaceholder="Email"
                        buttonName="Submit"
                        profileTarget="email"
                    />
                </InputItem>
                <InputItem>
                    <Info>
                        Update your Password:
                    </Info>
                    <FirebaseUserForm
                        inputPlaceholder="Password"
                        buttonName="Submit"
                        profileTarget="password"
                    />
                </InputItem>
            </AccountList>
            <Reusable.BottomButton onClick={() => console.log("Clicked")} text="Delete Account" />
        </Reusable.Page>

    )
}




/*var hidden = (<FirebaseUserForm
                    inputName="Change your username"
                    inputPlaceholder="Username"
                    buttonName="Submit"
                    profileTarget="displayName"
                />
                <FirebaseUserForm
                    inputName="Change your email"
                    inputPlaceholder="email"
                    buttonName="Submit"
                    profileTarget="email"
                />)*/