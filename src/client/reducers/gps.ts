import { Reducer } from "redux"
import { GPS } from "../Interfaces"

export interface gps extends GPS { }

const initState: gps = {
    geometry: {
        lat: 47.6679716,
        lng: -122.3815096
    }
}

export const gps: Reducer<gps> = (state = initState, action) => {
    switch (action.type) {
        case "SET_GPS_DATA":
        case "SYNC_FIREBASE":
            return { ...action.gpsData }
        default:
            return state;
    }
}