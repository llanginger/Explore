import * as React from "react"
import styled from "styled-components"
import { Colors } from "../../Interfaces"
import * as P from "polished"

interface TitleBarProps {
    venueName?: string;
    color: Colors;
    top?: string;
    left?: string;
    width?: string;
    height?: string;
    iconClass?: string;
    onClick?: any;
    fontSize?: string;
    children?: any;
}

const NameBar: any = styled.div`
    color: ${(props: TitleBarProps) => props.color.PRIMARY_TEXT};
    background: ${(props: TitleBarProps) => props.color.P_COLOR_DARK};
    position: absolute;
    top: ${(props: TitleBarProps) => props.top};
    left: ${(props: TitleBarProps) => props.left};
    text-align: center;
    width: ${(props: TitleBarProps) => props.width};
    height: ${(props: TitleBarProps) => props.height};
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const RightIcon = styled.span`
    width: 40px;
    height: 100%;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`



const LeftPad = styled.span`
    width: 40px;
    height: 100%;
    margin-left: 10px;
`

const ItemName: any = styled.span`
    color: white;
    font-size: ${(props: TitleBarProps) => props.fontSize};
`

export const VenueTitleBar: React.StatelessComponent<TitleBarProps> = (props: TitleBarProps) => {
    console.log("Venue Title Props: ", props);
    const {
        color,
        top = "16px",
        left = "0",
        width = "100%",
        height = "40px",
        iconClass = "pt-icon-large pt-icon-cross",
        fontSize = "20px",
        venueName,
        onClick
    } = props

    return (
        <NameBar
            color={color}
            top={top}
            left={left}
            height={height}
            width={width}
        >
            <LeftPad />
            <ItemName fontSize={fontSize}>{venueName}</ItemName>
            <RightIcon
                className={iconClass}
                onClick={onClick}
            />
            {props.children}
        </NameBar>
    )
}
