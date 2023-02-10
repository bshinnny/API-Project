import { csrfFetch } from './csrf';

const GET_ALL_USER_BOOKINGS = 'bookings/GET_ALL_USER_BOOKINGS';

// ACTIONS
export const getAllUserBookings = (bookings) => {
    return {
        type: GET_ALL_USER_BOOKINGS,
        bookings
    }
}

// THUNKS
export const getAllUserBookingsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/bookings/current')

    if (response.ok) {
        const userBookings = await response.json();
        dispatch(getAllUserBookings(userBookings));
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
export default function bookingsReducer(state = )
