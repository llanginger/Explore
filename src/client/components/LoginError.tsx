import * as React from "react"
import styled from "styled-components"

interface LoginErrorProps {
    error: string;
    show: boolean;
}

const Warning = styled.div`
    width: 100%;
    max-width: 500px;
    height: 100%;
    max-height: 500px;
    background: white;
    border: 2px solid black;
    display: flex;
    align-items: center;
    justify-content: center;

`
const Container = styled.div`
    width: 70%;
`

const ErrorText = styled.span`
    color: black;
`

const Dismiss = styled.button`
    width: 100%;
    color: black;
    border: 2px solid black;
    background: white;
`

export const LoginError = (props: LoginErrorProps) => {
    if (props.show === true) {
        return (
            <Warning>
                <Container>
                    <ErrorText>{props.error}</ErrorText>
                    <Dismiss>Dismiss</Dismiss>
                </Container>
            </Warning>
        )
    } else {
        return null
    }
}