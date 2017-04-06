import * as React from "react"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { BaseReduxProps } from "../Interfaces"
import { CLOSE_SETTINGS_PAGE, UPDATE_PROFILE_INFO } from "../actions/actions"
import styled from "styled-components"
import { FirebaseUserForm, Reusable } from "./Components"
import * as firebase from "firebase"
import * as Dropzone from "react-dropzone"

interface AccountProps extends BaseReduxProps {
    onClick: any;
}

export const AccountPage = (props: AccountProps) => {

    const { store } = props
    const storageRef = firebase.storage().ref();
    const currentUser = firebase.auth().currentUser
    const reduxUser = store.getState().loggedIn.user

    const changeUserName = (e) => {
        e.stopPropagation()
        const userName = firebase.auth().currentUser.displayName
    }

    const AccountList = styled(Reusable.MainList) `
        padding: 0px;
    `


    const Item = styled.li`
        background: #FC7A57;
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
        box-sizing: border-box;
        border: 8px solid white;
        background: white;
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
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    `

    const PicText = styled.p`
        padding: 5px;
    `

    const PicButton = styled.button`
        width: 96%;
        background: white;
        box-sizing: border-box;
        color: black;
        border: 2px solid black;
        margin-bottom: 5px;
        padding: 6px;
        box-shadow: 1px 1px 2px #333;

        &:active {
            box-shadow: none;
            outline: none;
            background: #888;
            color: white;
        }

        &:focus {
            outline: none;
        }
    `

    const onImageDrop = (files) => {
        console.log("File: ", files[0]);
        const user = firebase.auth().currentUser
        const fileName = files[0].name;
        const uploadTask = storageRef.child("images/" + fileName).put(files[0])

        uploadTask.on("state_changed",
            function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                }
            }, function (error) {

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            }, function () {
                // Upload completed successfully, now we can get the download URL
                var downloadURL = uploadTask.snapshot.downloadURL;
                user.updateProfile({ displayName: user.displayName, photoURL: downloadURL })
                props.store.dispatch(UPDATE_PROFILE_INFO({ profilePic: downloadURL }))
                console.log("Download url: ", downloadURL);
                console.log("User info: ", user);
            });
    }

    return (

        <Reusable.Page
        >
            <Reusable.TopBar onClick={props.onClick} text="Account Page" />
            <AccountList>
                <Item>
                    <PicContainer>
                        <Dropzone
                            multiple={false}
                            accept="image/*"
                            style={{}}
                            onDrop={onImageDrop}
                        >
                            <Pic src={reduxUser.profilePic} />
                        </Dropzone>
                    </PicContainer>
                    <PicInfo>
                        <PicText>Drag a photo onto the image to the left, or click the button bellow to upload a new profile picture.</PicText>
                        <PicButton type="file">Upload photo</PicButton>
                    </PicInfo>
                </Item>
                <InputItem>
                    <Info>
                        Update your Username:
                    </Info>
                    <FirebaseUserForm
                        inputPlaceholder={reduxUser.userName}
                        buttonName="Submit"
                        profileTarget="displayName"
                    />
                </InputItem>
                <InputItem>
                    <Info>
                        Update your Email:
                    </Info>
                    <FirebaseUserForm
                        inputPlaceholder={reduxUser.email}
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