import * as React from "react"
import * as classNames from "classNames"
import { BaseReduxProps } from "../Interfaces"

export interface HamburgerProps extends BaseReduxProps {
    styles: {};
}

export const Hamburger = (props: HamburgerProps) => {
    const { store } = props

    const hideHamburger = store.getState().homeInputState.active
    const hameMenuState = store.getState().settingsMenu
    console.log(hameMenuState)

    const hamburgerClasses = () => {
        return "c-hamburger c-hamburger--htx" + (hameMenuState.open ? " is-active" : "")
    }
    if ( hideHamburger === false) {
        return(
            <button
                style={ props.styles }
                onClick={() => {
                    if ( hameMenuState.open === false ) {
                        store.dispatch({
                            type: "OPEN_MENU"
                        })
                    } else {
                        store.dispatch({
                            type: "CLOSE_MENU"
                        })
                    }
                }}
                className={hamburgerClasses()}
            >
                <span>toggle menu</span>
            </button>
        )
    } else {
        return <div/>
    }

}