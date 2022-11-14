import { csrfFetch } from './csrf';

const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';

// ACTIONS
export const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
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
        default:
            return state;
    }
}
