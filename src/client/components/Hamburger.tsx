import * as React from "react"
import * as classNames from "classNames"
import { BaseReduxProps } from "../Interfaces"
import { OPEN_MENU, CLOSE_MENU } from "../actions/actions"

export interface HamburgerProps extends BaseReduxProps {
    styles: {};
}

export const Hamburger = (props: HamburgerProps) => {
    const { store } = props

    const hideHamburger = store.getState().homeInputState.active
    const hamMenuState = store.getState().settingsMenu
    // console.log(hameMenuState)

    const hamburgerClasses = () => {
        return "c-hamburger c-hamburger--htx" + (hamMenuState.open ? " is-active" : "")
    }
    if (hideHamburger === false) {
        return (
            <button
                style={props.styles}
                onClick={() => {
                    if (hamMenuState.open === false) {
                        store.dispatch(OPEN_MENU())
                    } else {
                        store.dispatch(CLOSE_MENU())
                    }
                }}
                className={hamburgerClasses()}
            >
                <span>toggle menu</span>
            </button>
        )
    } else {
        return <div />
    }

}