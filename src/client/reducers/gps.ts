export interface gps {
    formattedAddress?: string;
    geometry: {
        lat: number;
        lng: number;
    }; // tease this out
    name?: string;
    photos?: any[]; // tease this out
    types?: string[];
    vicinity?: string;
}

const initState: gps = {
    geometry: {
        lat: 47.6679716,
        lng: -122.3815096
    }
}

export const gps = (state = initState, action) => {
    switch (action.type) {
        case "SET_GPS_DATA":
            return { ...action.gpsData }
        default:
            return state;
    }
}