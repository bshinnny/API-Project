import { csrfFetch } from './csrf';

const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS';
const CREATE_A_REVIEW = 'reviews/CREATE_A_REVIEW';
const DELETE_A_REVIEW = 'reviews/DELETE_A_REVIEW';

// ACTIONS
export const getSpotReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        reviews
    }
}

export const createAReview = (review) => {
    return {
        type: CREATE_A_REVIEW,
        review
    }
}

export const deleteAReview = (reviewId) => {
    return {
        type: DELETE_A_REVIEW,
        reviewId
    }
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

export const createAReviewThunk = (review, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const review = await response.json();
        dispatch(createAReview(review));
        dispatch(getSpotReviewsThunk(spotId));
        return review;
    } else {
        throw response
    }
}

export const deleteAReviewThunk = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteAReview(reviewId));
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
export default function reviewsReducer(state = {}, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_SPOT_REVIEWS:
            const reviewsArr = action.reviews.Reviews;
            const reviewsObj = formatData(reviewsArr);
            newState['spotReviews'] = reviewsObj;
            return newState;
        // case CREATE_A_REVIEW:
        //     newState = {...state, spotReviews: {...state.spotReviews}};
        //     newState.spotReviews[action.review.id] = action.review;
        //     return newState;
        case DELETE_A_REVIEW:
            newState = {...state, spotReviews: {...state.spotReviews}};
            delete newState.spotReviews[action.reviewId];
            return newState;
        default:
            return state;
    }
}
