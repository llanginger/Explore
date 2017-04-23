import { Reducer } from "redux"
import { GPS } from "../Interfaces"

export interface gps extends GPS { }

const initState: gps = {
    geometry: {
        lat: 47.6679716,
        lng: -122.3815096
    }
}

// Clean up action payload formatting!!
export const gps: Reducer<gps> = (state = initState, action) => {
    switch (action.type) {
        case "SET_GPS_DATA":
        case "SYNC_FIREBASE":
            return { ...action.gpsData }
        case "USER_MARKER_CREATED":
            return {
                geometry: { ...action.userInfo.profileInfo.gpsCoords }
            }
        default:
            return state;
    }
}