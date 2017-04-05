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

export interface Categories {
    primary?: Category;
    secondary?: Category[]
}
export interface User {
    email: string;
    userName: string;
    profilePic: string;
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
}

export interface BaseReduxProps {
    store: Store<Reducers>
}

export interface PrefsPage extends BaseReduxProps {
    onClick: any;
}