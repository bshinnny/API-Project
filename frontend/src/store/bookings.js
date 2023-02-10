import { csrfFetch } from './csrf';

const GET_ALL_USER_BOOKINGS = 'bookings/GET_ALL_USER_BOOKINGS';
const CREATE_BOOKING = 'bookings/CREATE_BOOKING';

// ACTIONS
export const getAllUserBookings = (bookings) => {
    return {
        type: GET_ALL_USER_BOOKINGS,
        bookings
    }
}

export const createBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
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

export const createBookingThunk = (dates, spotId) => async dispatch => {
    const {checkIn, checkOut} = dates;
    const startDate = checkIn;
    const endDate = checkOut;

    // console.log(JSON.stringify({startDate, endDate}))

    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        body: JSON.stringify({
            startDate,
            endDate
        })
    })

    if (response.ok) {
        const booking = await response.json();
        dispatch(createBooking(booking));
        return booking;
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
const initalState = {
    userBookings: {}
}

export default function bookingsReducer(state = initalState, action) {
    let newState = {...state}
    switch (action.type) {
        case GET_ALL_USER_BOOKINGS:
            const bookingsArr = action.bookings.Bookings;
            const bookingsObj = formatData(bookingsArr);
            newState = {...state, userBookings: bookingsObj};
            return newState;
        case CREATE_BOOKING:
            newState = {...state, userBookings: {...state.userBookings}};
            newState.userBookings[action.booking.id] = action.booking;
            return newState
        default:
            return state;
    }
}
