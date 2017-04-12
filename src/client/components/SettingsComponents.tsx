import * as React from "react"
import styled from "styled-components"

export const TopBar = (props: { onClick: any, text: string }) => {

    const Bar = styled.div`
        width: 100%;
        height: 8%;
        min-height: 45px;
        background: #669EFF;
        position: relative;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;

        @media(min-height: 800px) {
            height: 64px;
        }
    `

    const Spacer = styled.span`
        width:50px;
    `

    const Text = styled.span`
        text-align: center;
        color: white;
        font-size: 20px;
        cursor: pointer;
    `
    const Close = styled.span`
        border: none;
        position: relative;
        display: inline-block;
        width: 40px;
        height: 40px;
        margin-left: 5px;
        overflow: hidden;
        &:hover {
            &:before, &:after {
            background: white;
            }
        }

        &:before, &:after {
            content: '';
            position: absolute;
            height: 2px;
            width: 80%;
            top: 50%;
            left: 0;
            margin-top: -1px;
            background: #000;
        }
        &:before {
            transform: rotate(45deg);
        }
        &:after {
            transform: rotate(-45deg);
        }
    `

    return (
        <Bar>
            <Close onClick={props.onClick} />
            <Text>{props.text}</Text>
            <Spacer />
        </Bar>
    )
}

export const BottomButton = (props: { onClick: any, text: string }) => {
    const Button = styled.button`
        height: 10%;
        min-height: 45px;
        color: white;
        font-size: 20px;
        background-color: #B10DC9;
        width: 100%;
        border: none;
        cursor: pointer;
        flex-shrink: 0;

        @media(min-height: 800px) {
            height: 80px;
        }
    `

    return (
        <Button onClick={props.onClick}>{props.text}</Button>
    )
}

export const Page = styled.div`
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        bottom: 0px;
        z-index: 600;
        left: 0px;
        background-color: black;
        height: 100%;
        width: 100%;
    `
export const MainList = styled.ul`
        list-style-type: none;
        width: 100%;
        height: 100%;
        margin: 0px;
        overflowY: scroll;
        background-color: white;
        padding: 5px 10px;

        &::-webkit-scrollbar {
            display: none;
        }
    `