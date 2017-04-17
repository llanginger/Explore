import * as React from "react"
import styled, { keyframes } from "styled-components"

const spin = keyframes`

0% {
    transform: rotate(0deg);
}

100% {
    transform: rotate(360deg);
}

`

export const Spinner = styled.div`
    border: 16px solid #607D8B;
    border-top: 16px solid white;
    border-radius: 50%;
    width: 120px;
    height: 120px;

    animation: ${spin} 2s linear infinite;

`