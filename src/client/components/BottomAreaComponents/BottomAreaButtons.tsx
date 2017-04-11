import * as React from "react"
import styled from "styled-components"

interface BottomAreaButtonsProps {
    leftButtonOnClick: any;
    rightButtonOnClick: any;
}

export const BottomAreaButtons = (props: BottomAreaButtonsProps) => {

    const RightButton = styled.button`
        position: absolute;
        right: 10px;
        font-size: 48px;
        background: transparent;
        padding: 5px;
        border: none;
        color: black;
        
        &:focus {
            outline: none;
        }
    `

    const LeftButton = styled.button`
        position: absolute;
        left: 10px;
        font-size: 48px;
        background: transparent;
        padding: 5px;
        border: none;
        color: black;

        &:focus {
            outline: none;
        }
    `

    const RightIconSpan = styled.span`
        color: white;
        filter: drop-shadow(6px 1px 2px black)
    `

    const LeftIconSpan = styled.span`
        color: white;
        filter: drop-shadow(-6px 1px 2px black)
    `


    return (
        <div style={{ marginTop: "-51px" }}>
            <LeftButton
                onClick={props.leftButtonOnClick}
            >
                <LeftIconSpan className="pt-icon pt-icon-chevron-left" />
            </LeftButton>
            <RightButton
                onClick={props.rightButtonOnClick}
            >
                <RightIconSpan className="pt-icon pt-icon-chevron-right" />
            </RightButton>
        </div>
    )
}