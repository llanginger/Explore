import * as React from "react"
import { PrefsPage } from "../Interfaces"
import Autocomplete from "react-google-autocomplete"
import styled from "styled-components"


// --- TODO --- //

// Hijack (or remake without blueprint) main input when user clicks the gps button.
// Present option for either using gps or entering location
// have "remember this for next time" checkbox

/*
export const LocationPage = (props: PrefsPage) => {

    const Page = styled.div`
        height: 100%;
        width: 100%;
        z-index: 2;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 0px;
        left: 0px;
        background: papayawhip;
    `

    const Container = styled.div`
        width: 90%;
    `

    const StyledAutocomplete: any = styled(RGA) `
       
    `

    return (
        <Page
            onClick={props.onClick}
        >
            <Container>
                <StyledAutocomplete
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    onPlaceSelected={(place) => {
                        console.log(place)
                    }}
                    types={[]}
                    componentRestrictions={{ country: "us" }}
                />
            </Container>
        </Page>
    )
}*/