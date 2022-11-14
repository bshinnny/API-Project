import { csrfFetch } from './csrf';

const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const GET_SPOT_DETAILS = 'spots/GET_SPOT_DETAILS';
const CREATE_A_SPOT = 'spots/CREATE_A_SPOT';

// ACTIONS
export const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

export const getSpotDetails = (spot) => {
    return {
        type: GET_SPOT_DETAILS,
        spot
    }
}

export const createASpot = (spot) => {
    return {
        type: CREATE_A_SPOT,
        spot
    }
}

// THUNKS
export const getAllSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const spots = await response.json();
        dispatch(getAllSpots(spots));
        return response;
    }
}

export const getSpotDetailsThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(getSpotDetails(spot))
    }
}

// export const createASpotThunk = (spot) => aysnc dispatch => {
//     const response = await csrfFetch(`api/spots`, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(spot)
//     })

//     if (response.ok) {
//         // IN PROGRESS
//     }
// }

// Format initial data.
const formatData = (array) => {
    const object = {};
    array.forEach(item => {
        object[item.id] = item;
    });
    return object;
}

// REDUCER
export default function spotsReducer(state = {}, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_ALL_SPOTS:
            // console.log(action.spots)
            const spotsArr = action.spots.Spots;
            const spotsObj = formatData(spotsArr);
            newState['allSpots'] = spotsObj;
            return newState;
        case GET_SPOT_DETAILS:
            newState['spotDetails'] = action.spot;
            return newState;
        default:
            return state;
    }
}
