import * as React from "react"
import { ColorPickerForm } from "./ColorPickerForm"
import { BaseReduxProps, Colors } from "../Interfaces"
import { COLOR_UPDATE } from "../actions/actions"
import styled from "styled-components"

interface ColorPickerProps extends BaseReduxProps { }

const Container = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background: white;
    padding-right: 30px;
    padding-left: 20px;
    z-index: 2000;
`

const List = styled.ul`
    list-style-type: none;
    padding-left: 10px;

    > li {
        padding: 10px;
    }
`

export const ColorPicker = (props: ColorPickerProps) => {

    const colors = props.store.getState().colors
    const showOptions = props.store.getState().initState.showThemeOptions
    const formSubmit: (color: Colors) => void = (color: Colors) => {
        props.store.dispatch(COLOR_UPDATE(color))
    }
    if (showOptions === true) {
        return (
            <Container>
                <List>
                    <li>
                        <ColorPickerForm
                            placeholder={colors.P_COLOR}
                            onSubmit={formSubmit}
                            colorType="P_COLOR"
                            label="Primary Color"
                        />
                    </li>
                    <li>
                        <ColorPickerForm
                            label="Primary Color Dark"
                            placeholder={colors.P_COLOR_DARK}
                            onSubmit={formSubmit}
                            colorType="P_COLOR_DARK"
                        />
                    </li>
                    <li>
                        <ColorPickerForm
                            label="Primary Color Light"
                            placeholder={colors.P_COLOR_LIGHT}
                            onSubmit={formSubmit}
                            colorType="P_COLOR_LIGHT"
                        />
                    </li>
                    <li>
                        <ColorPickerForm
                            label="Accent"
                            placeholder={colors.ACCENT}
                            onSubmit={formSubmit}
                            colorType="ACCENT"
                        />
                    </li>
                    <li>
                        <ColorPickerForm
                            label="Primary Text"
                            placeholder={colors.PRIMARY_TEXT}
                            onSubmit={formSubmit}
                            colorType="PRIMARY_TEXT"
                        />
                    </li>
                    <li>
                        <ColorPickerForm
                            label="Secondary text"
                            placeholder={colors.SECONDARY_TEXT}
                            onSubmit={formSubmit}
                            colorType="SECONDARY_TEXT"
                        />
                    </li>
                    <li>
                        <ColorPickerForm
                            label="Medium text"
                            placeholder={colors.MEDIUM_TEXT}
                            onSubmit={formSubmit}
                            colorType="MEDIUM_TEXT"
                        />
                    </li>
                    <li>
                        <ColorPickerForm
                            label="Icons"
                            placeholder={colors.ICONS}
                            onSubmit={formSubmit}
                            colorType="ICONS"
                        />
                    </li>
                    <li>
                        <ColorPickerForm
                            label="Divider"
                            placeholder={colors.DIVIDER}
                            onSubmit={formSubmit}
                            colorType="DIVIDER"
                        />
                    </li>
                </List>
            </Container>
        )

    } else {
        return null
    }

}