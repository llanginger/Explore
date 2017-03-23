import { Reducers } from "./Store"
import { Store } from "redux"

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

export interface Contact {
    phone?: string;
    formattedPhone?: string;
    twitter?: string;
    facebook?: string;
    facebookName?: string;
}

export interface openClose {
    open: boolean
}

export interface VenueResponse {
    queryInfo: {};
    venues: Venue[]
}

export interface FourSquareResult extends VenueResponse {
}

export interface Venue {
    location?: Location;
    contact?: Contact;
    name?: string;
    id?: string;
    photoSrc?: string[];
    reviews?: string[];
    rating?: number;
    categories?: Category[];
    visited?: boolean;
    seen?: boolean;
}

export interface BaseReduxProps {
    store: Store<Reducers>
}