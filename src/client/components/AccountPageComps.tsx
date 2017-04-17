import * as React from "react"
import styled from "styled-components"
import { FirebaseUserForm, Reusable } from "./Components"
import * as Dropzone from "react-dropzone"
import { Colors } from "../Interfaces"



interface AccountComponentProps {
    headerOnClick: Function;
    profilePic: string;
    profilePicOnDrop: Function;
    profilePicOnSelect: any;
    profileName: string;
    profileEmail: string;
    colors: Colors
}

export const AccountPageComponents = (props: AccountComponentProps) => {
    const { colors } = props

    const AccountList = styled(Reusable.MainList) `
        padding: 0px;
        background-color: ${colors.DIVIDER};
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        overflowY: scroll;

        @media(min-height: 800px) and (min-width: 700px) {
            padding: 10px;
        }
    `


    const Item = styled.li`
        background: mediumvioletred;
        background-color: ${colors.P_COLOR};
        margin: 0;
        display: flex;
        flex-shrink: 0;
        align-items: center;
        padding: 15px;
        box-sizing: border-box;

        @media(min-height: 800px) and (min-width: 700px) {
            padding: 30px 15px;
        }
    `

    const InputItem = styled(Item) `
        flex-direction: column;
    `

    const Info = styled.div`
        width: 100%;
        color: white;
        color: ${colors.PRIMARY_TEXT};
        margin-bottom: 10px;
    `

    const PicContainer = styled.div`
        box-sizing: border-box;
        border: 8px solid white;
        background: white;
        background-color: ${colors.P_COLOR_LIGHT};
        height: 125px;
        width: 125px;
        flex-shrink: 0;
        overflow: hidden;
    `

    const PicUpdater = styled.div`
        height: 125px;
        width: 100%;
        margin-left: 10px;
        background: white;
    `

    const Pic = styled.img`
        max-height: 100%;
        width: 100%;
    `

    const PicInfo = styled.div`
        height: 125px;
        width: 100%;
        background: white;
        background-color: ${colors.P_COLOR_LIGHT};
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    `

    const PicText = styled.p`
        color: ${colors.SECONDARY_TEXT};
        padding: 5px;
        margin-bottom: 3px;
    `

    const PicButton = styled.label`
        width: 96%;
        background: white;
        background-color: ${colors.ACCENT};
        box-sizing: border-box;
        text-align: center;
        color: black;
        color: ${colors.PRIMARY_TEXT};
        border: 1px solid black;
        margin-bottom: 5px;
        padding: 6px;
        box-shadow: 1px 1px 2px #333;
        cursor: pointer;

        &:active {
            box-shadow: none;
            outline: none;
            background: #888;
            color: white;
            color: ${colors.SECONDARY_TEXT};
        }

        &:focus {
            outline: none;
        }
    `

    return (

        <Reusable.Page
        >
            <Reusable.TopBar onClick={props.headerOnClick} text="Account Page" />
            <AccountList>
                <Item>
                    <PicContainer>
                        <Dropzone
                            multiple={false}
                            accept="image/*"
                            style={{}}
                            onDrop={props.profilePicOnDrop}
                        >
                            <Pic src={props.profilePic} />
                        </Dropzone>
                    </PicContainer>
                    <PicInfo>
                        <PicText>Drag a photo onto the image to the left, or click the button bellow to upload a new profile picture.</PicText>

                        <PicButton>
                            Upload Image
                                <input type="file" style={{ display: "none" }} onChange={props.profilePicOnSelect} />
                        </PicButton>

                    </PicInfo>
                </Item>
                <InputItem>
                    <Info>
                        Update your Username:
                    </Info>
                    <FirebaseUserForm
                        inputPlaceholder={props.profileName}
                        buttonName="Submit"
                        profileTarget="displayName"
                    />
                </InputItem>
                <InputItem>
                    <Info>
                        Update your Email:
                    </Info>
                    <FirebaseUserForm
                        inputPlaceholder={props.profileEmail}
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