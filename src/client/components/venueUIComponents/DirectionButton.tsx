import * as React from "react"
import { Colors } from "../../Interfaces"
import styled from "styled-components"
import * as P from "polished"

interface DirectionsProps {
    color: Colors;
    onClick: any;
    iconClass: string;
    width?: string;
    height?: string;
    bottom?: string;
    right?: string;
}


const Button: any = styled.div`
    width: ${(props: DirectionsProps) => props.width};
    height: ${(props: DirectionsProps) => props.height};
    border-radius: 50%;
    background: ${(props: DirectionsProps) => props.color.ACCENT};
    position: absolute;
    bottom: ${(props: DirectionsProps) => props.bottom};
    right: ${(props: DirectionsProps) => props.right};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 4px 4px 15px #222;
    transition: all .05s ease-in-out;
    cursor: pointer;

    &:hover {
        background: ${P.desaturate(0.1, "#536DFE")};
    }

    &:active {
        background: ${P.desaturate(0.1, "#536DFE")};
        transform: translateY(3px);
        box-shadow: 1px 1px 10px #222;
    }
`

const Icon: any = styled.span`
    color: white;
    font-size: 20px;
`


export const DirectionButton = (props: DirectionsProps) => {

    const { width = "45px", height = "45px", bottom = "16px", right = "16px" } = props
    return (
        <Button
            color={props.color}
            onClick={props.onClick}
            height={height}
            width={width}
            bottom={bottom}
            right={right}
        >
            <Icon className={props.iconClass} />
        </Button>
    )
}