import { Reducers } from "../Store"
import { Store, Action } from "redux"

export interface Location {
    address?: string;
    lat?: number;
    lng?: number;
    crossStreet?: string;
    postalCode?: string;
    cc?: string;
    city?: string;
    state?: string;
    country?: string;
    distance?: number;
    formattedAddress?: string[];
}

export interface QueryInfo {
    category?: string;
    near?: string;
    limit?: number;
    inputActive?: boolean
}

export interface CategoryIcon {
    prefix: string;
    suffix: string;
}

export interface Category {
    id: string;
    name: string;
    pluralName: string;
    shortName: string;
    icon: CategoryIcon;
    primary?: boolean
}

export interface Geometry {
    lat: number;
    lng: number;
}
export interface GPS {
    formattedAddress?: string;
    geometry: Geometry;
    name?: string;
    photos?: any[]; // tease this out
    types?: string[];
    vicinity?: string;
}

export interface Categories {
    primary?: Category;
    secondary?: Category[]
}
export interface User {
    email?: string;
    userName?: string;
    profilePic?: string;
}

export interface Contact {
    phone?: string;
    formattedPhone?: string;
    twitter?: string;
    facebook?: string;
    facebookName?: string;
}

export interface GooglePlaces {
    formattedAddress?: string;
    geometry?: {}; // tease this out
    name?: string;
    photos?: any[]; // tease this out
    types?: string[];
    vicinity?: string;
}

export interface openClose {
    open: boolean
}

export interface VenueResponse {
    queryInfo: {};
    venues: Venue[]
}

export interface MasterAction {
    type: string;
    venue?: Venue;
    venues?: Venue[];
    queryInfo?: QueryInfo;
    id?: string;
    page?: string;
}

export interface Colors {
    P_COLOR_DARK?: string;
    P_COLOR?: string;
    P_COLOR_LIGHT?: string;
    ACCENT?: string;
    PRIMARY_TEXT?: string;
    MEDIUM_TEXT?: string;
    SECONDARY_TEXT?: string;
    ICONS?: string;
    DIVIDER?: string;
}

export interface Venue {
    location?: Location;
    contact?: Contact;
    name?: string;
    id?: string;
    photoSrc?: string[];
    reviews?: string[];
    rating?: number;
    categories?: Categories;
    visited?: boolean;
    seen?: boolean;
    marker?: any;
    favorite?: boolean;
}

export interface BaseReduxProps {
    store: Store<Reducers>
}

export interface PrefsPage extends BaseReduxProps {
    onClick: any;
}

export interface ProfileInfo {
    email?: string;
    userName?: string;
    profilePic?: string;
    positionMarker?: google.maps.Marker | any;
    hasGps?: boolean;
    gpsCoords?: Geometry;
    showDirections?: {
        start: {};
        end: {};
    }
}

export interface DBInfo { //Clean this up?
    visitedVenues?: {
        visitedVenues?: Venue[];
        visitedIds?: string[];
    }
    location?: {}
    favoriteVenues?: {
        favoriteVenues?: Venue[];
        favoriteIds?: string[]
    }
}

export interface MapOpts {
    mapRef?: google.maps.Map;
    directionsRenderer?: google.maps.DirectionsRenderer | any;
    directionsService?: google.maps.DirectionsService | any;
}

export interface StartEnd {
    start: Geometry;
    end: Geometry;
}
export interface Payload {
    venue?: Venue;
    errorMessage?: string;
    oldVenue?: Venue;
    venues?: Venue[];
    queryInfo?: QueryInfo;
    visitedVenues?: Venue[];
    page?: string;
    id?: string;
    gpsData?: Geometry;
    mapOpts?: MapOpts;
    profileInfo?: ProfileInfo;
    dbInfo?: DBInfo;
    marker?: google.maps.Marker | any;
    markerPos?: google.maps.LatLng | any;
    startEnd?: StartEnd;
    color?: Colors;
}

export interface PAction extends Action {
    payload?: Payload;
}
// Make smaller bespoke interfaces?