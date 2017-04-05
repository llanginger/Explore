import * as React from "react"
import { BaseReduxProps, Venue } from "../Interfaces"
import { BLUR_INPUT } from "../actions/actions"

interface ExploreMapProps extends BaseReduxProps {
    className: string;
    styles: {};
    init_lat: number;
    init_lng: number;
}

interface Marker {
    position: any;
    map: any;
    name?: string;
    reviews?: string[]
    rating?: number;
    addListener?: Function;
}

interface MapProps {
    venue?: Venue;
    class: string;
    innerRef: any;
    styles?: {};
    map?: any;
    userMarker?: any;
    onClick?: any;
}

export const Map = (props: MapProps) => {



    return (
        <div
            style={props.styles}
            onClick={props.onClick}
            className={props.class}
            ref={props.innerRef}
        />
    )
}