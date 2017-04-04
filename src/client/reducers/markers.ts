export interface markers {
    markers: any[]
}

const initState: markers = {
    markers: []
}
export const markers = (state: markers = initState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}