import * as React from "react"
import styled from "styled-components"
import { Colors } from "../Interfaces"



interface MenuProps {
    profileImage: string;
    userName: string;
    accountOnClick: any;
    placesOnClick: any;
    logOutOnClick: any;
    themeOptionsOnClick: any;
    bufferOnClick: any;
    colors: Colors;
}

export const SettingsMenuComponents = (props: MenuProps) => {
    const Container = styled.div`
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        display: flex;
        width: 100%;
        z-index: 11;

        @media(min-width: 700px) {
            width: 350px;
        }
    `

    const Menu = styled.div`
        position: relative;
        z-index: 30;
        width: 70%;
        height: 100%;
        background: white;
    `

    const MenuList = styled.ul`
        transition: all .3s ease-in-out;
        list-style-type: none;
        color: black;
        font-size: 20px;
        position: absolute;
        padding-left: 0px;
        top: 19%;
        left: 10%;
    `

    const MenuItem = styled.li`
        margin-bottom: 20px;
        cursor: pointer;
    `

    const MenuIcon = styled.span`
        margin-right: 20px;
    `

    const MenuBuffer = styled.div`
        width: 30%;
        height: 100%;
    `

    const ProfilePanelContainer = styled.div`
        position: relative;
        transition: all .3s ease-in-out;
        height: 66px;
        width: 100%;    
        background: ${props.colors.P_COLOR_DARK};

        @media(min-height: 800px) {
            height: 80px;
        }
    `

    const ProfilePanel = styled.div`
        position: relative;
        background: ${props.colors.P_COLOR_DARK};
        height: 100%;
        display: flex;
        width: 100%;
        box-sizing: border-box;
        justify-content: space-between;
        padding: 10px;
    `

    const ProfileImage = styled.img`
        transition: all .3s ease-in-out;
        width: 46px;
        height: 46px;
        flex-shrink: 0;
        border-radius: 50%;

        @media(min-height: 800px) {
            height: 60px;
            width: 60px;
        }
    `

    const ProfileTextContainer = styled.div`
        width: 100%;
        height: 100%;
        margin-left: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    `

    const ProfileText = styled.span`
        padding: 5px;
        color: white;
    `


    return (
        <Container>
            <Menu>
                <ProfilePanelContainer>
                    <ProfilePanel>
                        <ProfileImage src={props.profileImage} />
                        <ProfileTextContainer>
                            <ProfileText>{props.userName}</ProfileText>
                        </ProfileTextContainer>
                    </ProfilePanel>
                </ProfilePanelContainer>
                <MenuList>
                    <MenuItem onClick={props.accountOnClick}>
                        <MenuIcon className="pt-icon-standard pt-icon-cog" />
                        Account
                    </MenuItem>
                    <MenuItem onClick={props.placesOnClick}>
                        <MenuIcon className="pt-icon-standard pt-icon-path-search" />
                        Places You've Been
                    </MenuItem>
                    <MenuItem onClick={props.logOutOnClick}>
                        <MenuIcon className="pt-icon-standard pt-icon-social-media" />
                        Log Out
                    </MenuItem>
                    <MenuItem onClick={props.themeOptionsOnClick}>
                        <MenuIcon className="pt-icon-standard pt-icon-cog" />
                        Theme Opts (dev tool)
                    </MenuItem>
                </MenuList>
            </Menu>
            <MenuBuffer onClick={props.bufferOnClick} />
        </Container>
    )

}