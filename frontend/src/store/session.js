import { csrfFetch } from './csrf';

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

// ACTIONS
export const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

export const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}

// THUNKS
export const login = (payload) => async dispatch => {
    const response = await csrfFetch('api/session', {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const session = await response.json();
        dispatch(setUser(session.user));
        return session;
    }
}

// REDUCER
export default function sessionReducer(state = {user: null}, action) {
    switch (action.type) {
        case SET_USER:
            const newStateSet = { ...state, user: {...action.user} };
            return newStateSet;
        case REMOVE_USER:
            const newStateRemove = {...state, user: null};
            return newStateRemove;
        default:
            return state;
    }
}
