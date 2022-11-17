import { csrfFetch } from './csrf';

const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const GET_SPOT_DETAILS = 'spots/GET_SPOT_DETAILS';
const CREATE_A_SPOT = 'spots/CREATE_A_SPOT';
const GET_USER_SPOTS = 'spots/GET_USER_SPOTS';
const DELETE_A_SPOT = 'spots/DELETE_A_SPOT';
const EDIT_A_SPOT = 'spots/EDIT_A_SPOT';

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

export const getUserSpots = (spots) => {
    return {
        type: GET_USER_SPOTS,
        spots
    }
}

export const deleteASpot = (spotId) => {
    return {
        type: DELETE_A_SPOT,
        spotId
    }
}

export const editASpot = (spot) => {
    return {
        type: EDIT_A_SPOT,
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
        return response;
    }
}

export const createASpotThunk = (spot) => async dispatch => {
    const { url, ...newSpot } = spot;

    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        // headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newSpot)
    })

    if (response.ok) {
        const spot = await response.json();
        const image = await csrfFetch(`/api/spots/${spot.id}/images`, {
            method: 'POST',
            // headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                url: url,
                preview: true
            })
        })
        if (image.ok) {
            spot.previewImage = url;
        } else {
            spot.previewImage = null;
        }
        dispatch(createASpot(spot))
        return spot;
    }
}

export const getUserSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current');

    if (response.ok) {
        const spots = await response.json();
        dispatch(getUserSpots(spots));
        return response;
    }
}

export const deleteASpotThunk = (spotId) => async dispatch => {
    // console.log('Deleted spot ID from component:', spotId)
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        // console.log('Deleted spot from database.')
        dispatch(deleteASpot(spotId))
    }
}

export const editASpotThunk = (spot, spotId) => async dispatch => {
    const { url, ...editedSpot } = spot;
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: JSON.stringify(editedSpot)
    })

    if (response.ok) {
        const spot = await response.json();
        await csrfFetch(`/api/spots/${spot.id}/images`, {
            method: 'POST',
            // headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                url: url,
                preview: false
            })
        })
        dispatch(editASpot(spot))
        return spot;
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
    let newState = { ...state }
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
        case CREATE_A_SPOT:
            newState['newSpot'] = action.spot;
            return newState;
        case GET_USER_SPOTS:
            const userSpotsArr = action.spots.Spots;
            const userSpotsObj = formatData(userSpotsArr);
            newState['userSpots'] = userSpotsObj;
            return newState;
        case DELETE_A_SPOT:
            // console.log('In the reducer.')
            newState = {...state, userSpots: {...state.userSpots}};
            delete newState.userSpots[action.spotId];
            return newState;
        case EDIT_A_SPOT:
            newState = {...state, userSpots: {...state.userSpots}, allSpots: {...state.allSpots}};
            newState.userSpots[action.spot.id] = action.spot;
            newState.allSpots[action.spot.id] = action.spot;
            return newState;
        default:
            return state;
    }
}
