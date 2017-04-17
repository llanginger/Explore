import { BaseReduxProps } from "../Interfaces"
import * as React from "react"
import { BOTTOM_AREA_BIG } from "../actions/actions"
import styled, { keyframes } from "styled-components"


export interface InfoCardProps extends BaseReduxProps {

}

const fadeIn = keyframes`
    0% { 
        transform: scale(0.7);
        opacity: 0.5; 
    }

    50% {
        transform: scale(0.9);
        opacity: 0.6; 
    }
    100% { 
        transform: scale(1); 
        opacity: 1;
    }
`

const Card = styled.div`
    color: white;
    box-shadow: 5px 5px 5px #333;
    width: 90%;
    position: absolute;
    top: 17%;
    left: 5%;
    cursor: pointer;

    animation: ${fadeIn} .2s ease-in-out forwards;
`

const Rating: any = styled.div`
    position: absolute;
    box-shadow: 5px 5px 10px #333;
    bottom: -10px;
    right: -10px;
    padding: 8px;
    color: white;
    border-radius: 50%;
    background: ${(props: any) => props.rating};
`

const Title = styled.div`
    text-align: center;
    font-size: 22px;
    font-weight: 400;
    padding: 10px;
    background-color: ${(props: any) => props.color};
    color: white;
`

const Content = styled.div`
    font-size: 16px;
    background: white;
    padding: 5px 5px 10px 5px;
    text-align: center;
    color: black;
    font-weight: 400;
`

export const InfoCard = (props: InfoCardProps) => {


    const { store } = props
    const venue = store.getState().currentVenue
    const inputState = store.getState().homeInputState
    const colors = store.getState().colors

    if (venue.name.length > 0 && inputState.active == false) {
        const { rating } = venue
        const pickRatingColor = () => {
            if (rating >= 7) {
                return "#0F9960"
            } else if (rating >= 4) {
                return "#D9822B"
            } else if (rating >= 0) {
                return "#F55656"
            } else {
                return "#669EFF"
            }
        }




        return (
            <Card
                className="infoCard"
                onClick={() => {
                    store.dispatch(BOTTOM_AREA_BIG())
                }}
            >
                <Title
                    color={colors.P_COLOR_DARK}
                >
                    {venue.name}
                </Title>
                <Content>
                    {venue.reviews[0].substr(0, 49)}...
                </Content>
                <Rating
                    rating={pickRatingColor()}
                >
                    {venue.rating.toFixed(1)}
                </Rating>
            </Card>
        )
    } else {
        return null
    }

}