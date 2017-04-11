import * as React from "react"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { BaseReduxProps } from "../Interfaces"
import { CLOSE_SETTINGS_PAGE, UPDATE_PROFILE_INFO } from "../actions/actions"
import styled from "styled-components"
import { FirebaseUserForm, Reusable } from "./Components"
import * as firebase from "firebase"
import * as Dropzone from "react-dropzone"
import { AccountPageComponents } from "./AccountPageComps"

interface AccountProps extends BaseReduxProps {
    onClick: any;
}

export const AccountPage = (props: AccountProps) => {

    const { store } = props
    const storageRef = firebase.storage().ref();
    const currentUser = firebase.auth().currentUser
    const reduxUser = store.getState().userReducer

    const changeUserName = (e) => {
        e.stopPropagation()
        const userName = firebase.auth().currentUser.displayName
    }



    const onImageSelect = (e) => {
        const file = e.target.files[0];
        console.log("File: ", file);
        uploadImage(file)
    }

    const onImageDrop = (files) => {
        console.log("Whole file: ", files);
        console.log("File: ", files[0]);
        const file = files[0];
        uploadImage(file)
    }


    const uploadImage = (file) => {
        const user = firebase.auth().currentUser
        const uploadTask = storageRef.child("images/" + file.name).put(file)

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
            }, function (error: Error) {

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.message) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        console.log("Firebase error: ", error.message);
                        break;

                    case 'storage/canceled':
                        console.log("Firebase error: ", error.message);
                        // User canceled the upload
                        break;

                    case 'storage/unknown':
                        console.log("Firebase error: ", error.message);
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
        <AccountPageComponents
            headerOnClick={props.onClick}
            profilePic={reduxUser.profilePic}
            profilePicOnDrop={onImageDrop}
            profilePicOnSelect={onImageSelect}
            profileEmail={reduxUser.email}
            profileName={reduxUser.userName}
        />
    )


}

