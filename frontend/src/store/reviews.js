import { csrfFetch } from './csrf';

const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS';

// ACTIONS
export const getSpotReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        reviews
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

// THUNKS
export const getSpotReviewsThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(getSpotReviews(reviews));
        return response;
    }
}

export default function reviewsReducer(state = {}, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_SPOT_REVIEWS:
            const reviewsArr = action.reviews.Reviews;
            const reviewsObj = formatData(reviewsArr);
            newState['spotReviews'] = reviewsObj;
            return newState;
        default:
            return state;
    }
}
