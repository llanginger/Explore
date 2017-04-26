import { Reducer } from "redux"
import { GPS, PAction } from "../Interfaces"

export interface gps extends GPS { }

const initState: gps = {
    geometry: {
        lat: 47.6679716,
        lng: -122.3815096
    }
}

// Clean up action payload formatting!!
export const gps: Reducer<gps> = (state = initState, action: PAction) => {
    switch (action.type) {
        case "SET_GPS_DATA":
        case "SYNC_FIREBASE":
            return {
                ...state,
                geometry: action.payload.gpsData
            }
        case "USER_MARKER_CREATED":
            return {
                geometry: { ...action.payload.profileInfo.gpsCoords }
            }
        default:
            return state;
    }
}