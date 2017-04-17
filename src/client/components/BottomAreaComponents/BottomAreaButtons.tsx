import * as React from "react"
import styled from "styled-components"

interface BottomAreaButtonsProps {
    leftButtonOnClick: any;
    rightButtonOnClick: any;
}



const BaseButton = styled.button`
    position: absolute;
    font-size: 48px;
    background: transparent;
    padding: 5px;
    border: none;
    color: black;
    cursor: pointer;
    
    &:focus {
        outline: none;
    }
`

const RightButton = styled(BaseButton) `
    right: 10px;
`

const LeftButton = styled(BaseButton) `
    left: 10px;
`

export const BottomAreaButtons = (props: BottomAreaButtonsProps) => {

    const RightIconSpan = styled.span`
        color: white;
        filter: drop-shadow(6px 1px 1px black)
    `

    const LeftIconSpan = styled.span`
        color: white;
        filter: drop-shadow(-6px 1px 1px black)
    `


    return (
        <div className="bottomButtons" style={{ marginTop: "-51px" }}>
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