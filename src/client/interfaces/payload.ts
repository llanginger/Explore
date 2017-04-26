import { Action } from "redux"
import {
    Location,
    QueryInfo,
    Venue,
    Geometry,
    GooglePlaces,
    MapOpts,
    ProfileInfo,
    DBInfo,
    StartEnd,
    Colors
} from "./generalInterfaces"

export interface VenueAction extends Action {
    payload: {
        venue: Venue
    }
}

export interface PrevVenueAction extends Action {
    payload: {
        venue: Venue;
        oldVenue: Venue;
    }
}

export interface VisitedVenueAction extends Action {
    payload: {
        venue: Venue;
        id?: string;
    }
}

export interface FetchedVenuesAction extends Action {
    payload: {
        venues?: Venue[];
        visitedVenues?: string[];
        queryInfo?: QueryInfo;
    }
}

export interface SettingsPageAction {
    type: string;
    payload: {
        page: string;
    }
}

export interface LogInAction extends Action {
    payload: {
        profileInfo: ProfileInfo;
        dbInfo: DBInfo;
    }
}

export interface InputGPSAction extends Action {
    payload: {
        marker: google.maps.Marker
    }
}

export interface MovedMarkerAction extends Action {
    payload: {
        marker: google.maps.Marker
    }
}

export interface SetGPSDataAction extends Action {
    payload: {
        gpsData: GooglePlaces; // FIX THIS
    }
}

export interface UpdateProfileInfoAction extends Action {
    payload: {
        profileInfo: ProfileInfo;
    }
}

export interface UpdateProfilePicAction extends Action {
    payload: {
        profilePic: string;
    }
}

export interface FocusUserMarkerAction extends Action {
    payload: {
        markerPos: google.maps.LatLng | google.maps.LatLngLiteral;
    }
}

export interface ShowDirectionsAction extends Action {
    payload: {
        startEnd: StartEnd;
    }
}

export interface MapLoadedAction extends Action {
    payload: {
        mapOpts: MapOpts;
    }
}

export interface ColorUpdateAction extends Action {
    payload: {
        color: Colors;
    }
}


