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
}



const Image: any = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background-image: url("${(props: ImageProps) => props.url}");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`


const Item: any = styled.li`
    width: ${(props: ImageProps) => props.width};
    height: ${(props: ImageProps) => props.height};
    margin-bottom: ${(props: ImageProps) => props.marginBottom};
`

export const VenueImage: React.StatelessComponent<ImageProps> = (props: ImageProps) => {
    const { url, color = "white", width = "100%", height = "250px", marginBottom = "10px" } = props
    return (
        <Item
            width={width}
            height={height}
            marginBottom={marginBottom}
        >
            <Image url={props.url}>{props.children}</Image>
        </Item>
    )
}