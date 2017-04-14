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
`

const List = styled.ul`
    list-style-type: none;
    padding-left: 10px;

    > li {
        padding: 10px;
    }
`

export const ColorPicker = (props: ColorPickerProps) => {

    const formSubmit: (color: Colors) => void = (color: Colors) => {
        props.store.dispatch(COLOR_UPDATE(color))
    }

    return (
        <Container>
            <List>
                <li>
                    <ColorPickerForm
                        placeholder="Primary Color"
                        onSubmit={formSubmit}
                        colorType="P_COLOR"
                    />
                </li>
                <li>
                    <ColorPickerForm
                        placeholder="Primary Color Dark"
                        onSubmit={formSubmit}
                        colorType="P_COLOR_DARK"
                    />
                </li>
                <li>
                    <ColorPickerForm
                        placeholder="Primary Color Light"
                        onSubmit={formSubmit}
                        colorType="P_COLOR_LIGHT"
                    />
                </li>
                <li>
                    <ColorPickerForm
                        placeholder="Accent"
                        onSubmit={formSubmit}
                        colorType="ACCENT"
                    />
                </li>
                <li>
                    <ColorPickerForm
                        placeholder="Primary Text"
                        onSubmit={formSubmit}
                        colorType="PRIMARY_TEXT"
                    />
                </li>
                <li>
                    <ColorPickerForm
                        placeholder="Seconday Text"
                        onSubmit={formSubmit}
                        colorType="SECONDARY_TEXT"
                    />
                </li>
                <li>
                    <ColorPickerForm
                        placeholder="Icons"
                        onSubmit={formSubmit}
                        colorType="ICONS"
                    />
                </li>
                <li>
                    <ColorPickerForm
                        placeholder="Divider"
                        onSubmit={formSubmit}
                        colorType="DIVIDER"
                    />
                </li>
            </List>
        </Container>
    )

}