import * as React from "react"
import styled from "styled-components"
import { Colors } from "../Utility/Colors"

interface ContainerProps {
    big: boolean
    className: string;
}

interface CProps extends ContainerProps { }
export const BottomAreaContainer = (props: ContainerProps) => {

    const Container = styled.div`
        background: ${Colors.GOOD};
        position: absolute;
        height: ${(props: CProps) => props.big ? "100%" : "20%"};
        width: ${(props: CProps) => props.big ? "100%" : "90%"};
        left: ${(props: CProps) => props.big ? "0%" : "5%"};
        bottom: ${(props: CProps) => props.big ? "0px" : "-80px"};
        border-radius: ${(props: CProps) => props.big ? "0px" : "10px 10px 0px 0px"};
        box-shadow: ${(props: CProps) => props.big ? "none" : "5px 5px 7px #333"};
        display: flex;
        flex-direction: column;
        
    `

    return (
        <Container
            big={props.big}
            className={props.className}
        />
    )
}