import * as React from "react"
import { BaseReduxProps, Venue, Colors } from "../Interfaces"
import styled from "styled-components"
import * as P from "polished"
import { store } from "../Store"

interface HProps {
    color: Colors;
    favorite?: boolean
    fontSize?: string;
    className: string;
}

const Span: React.StatelessComponent<HProps> = (props) => {
    return <span className={props.className}>{props.children}</span>
}

const HeartIcon = styled(Span) `
    color: ${props => props.favorite ? "#F44336" : props.color.P_COLOR_LIGHT};
    text-shadow: ${props => props.favorite ? "none" : "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"};
    font-size: ${props => props.fontSize ? props.fontSize : "20px"};
    &:hover {
        color: #F44336;
        text-shadow: none;
    }
`