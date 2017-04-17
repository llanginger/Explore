import * as React from "react"
import styled from "styled-components"

interface BottomAreaImageProps {
    onClick: any;
    big: boolean;
    image: string;
    children: any;
}

interface IProps extends BottomAreaImageProps { }

export const BottomAreaImage = (props: BottomAreaImageProps) => {

    const VenueImage = styled.div`
        height: 200px;
        width: 100%;
        border-radius: ${(props: IProps) => props.big ? "0px" : "10px 10px 0px 0px"};
        transition: all .5s linear;
        background-image: url('${(props: IProps) => props.image}');
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        align-items: center;
        cursor: ${(props: IProps) => props.big ? "initial" : "pointer"};
    `

    return (
        <VenueImage
            className="imgContainer"
            onClick={props.onClick}
            big={props.big}
            image={props.image}
            children={props.children}
        >
            {props.children}
        </VenueImage>
    )
}