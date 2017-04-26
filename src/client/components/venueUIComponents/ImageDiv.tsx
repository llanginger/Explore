import * as React from "react"
import styled from "styled-components"
import { Colors } from "../../Interfaces"

interface ImageProps {
    url: string;
    color?: Colors;
    width?: string;
    height?: string;
    marginBottom?: string;
    children?: any;
    onClick?: any;
    padding?: string;
    className?: string;
}

const Item: any = styled.li`
    padding: ${(props: ImageProps) => props.padding};
    width: ${(props: ImageProps) => props.width};
    height: ${(props: ImageProps) => props.height};
    margin-bottom: ${(props: ImageProps) => props.marginBottom};

    @media(min-width: 700px) {
        height: 250px;
    }
`

const Image: any = styled.div`
    width: 100%;
    height: 100%;
    position: relative; 
    background-image: url("${(props: ImageProps) => props.url}");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`

export const VenueImage: React.StatelessComponent<ImageProps> = (props: ImageProps) => {
    const {
        url,
        onClick = () => { },
        color = "white",
        width = "100%",
        height = "250px",
        marginBottom = "10px",
        padding = "0px",
        className = "",
    } = props
    return (
        <Item
            width={width}
            height={height}
            marginBottom={marginBottom}
            onClick={onClick}
            padding={padding}
            className={className}
        >
            <Image url={props.url}>{props.children}</Image>
        </Item>
    )
}