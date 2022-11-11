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
// Login
export const login = (payload) => async dispatch => {
    const response = await csrfFetch('api/session', {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data.user));
        return response;
    }
}

// Restore
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

// Sign-up
export const signup = (user) => async (dispatch) => {
    const { username, email, password, firstName, lastName } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

// Log-out
export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };

// REDUCER
export default function sessionReducer(state = {user: null}, action) {
    switch (action.type) {
        case SET_USER:
            const newStateSet = { ...state, user: action.user };
            return newStateSet;
        case REMOVE_USER:
            const newStateRemove = {...state, user: null};
            return newStateRemove;
        default:
            return state;
    }
}
