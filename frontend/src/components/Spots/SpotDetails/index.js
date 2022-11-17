import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from "react-router-dom";
import * as spotsActions from '../../../store/spots';
import * as reviewsActions from '../../../store/reviews';
import SpotReview from '../../Reviews/SpotReview';
import './SpotDetails.css';

function SpotDetails() {
    const dispatch = useDispatch()
    const { spotId } = useParams();

    const spot = useSelector(state => state.spots.spotDetails);
    const reviews = useSelector(state => state.reviews.spotReviews);

    useEffect(() => {
        dispatch(spotsActions.getSpotDetailsThunk(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(reviewsActions.getSpotReviewsThunk(spotId))
    }, [dispatch, spotId])

    if (!spot) return null;

    return (
        <div>
            <h1>{spot.name}</h1>
            <div className='spot-details-header'>
                <p>
                    <i className="fa-solid fa-star"></i> {spot.avgStarRating} · {spot.numReviews} reviews.
                </p>
            </div>
            <div className='spot-details-images'>
                <div className='preview-image-div'>
                    <img className='preview-image' alt={`spotImg-${spot.SpotImages[0].id}`} src={spot.SpotImages[0].url}></img>
                </div>
                <div className='small-images-div'>
                    <div className='top-left'>
                        {spot.SpotImages[1] ? (<img className='top-left-image' alt={`spotImg-${spot.SpotImages[1].id}`} src={spot.SpotImages[1].url}></img>) : <p>No Image Available</p>}
                    </div>
                    <div className='top-right'>
                        {spot.SpotImages[2] ? (<img className='top-right-image' alt={`spotImg-${spot.SpotImages[2].id}`} src={spot.SpotImages[2].url}></img>) : <p>No Image Available</p>}
                    </div>
                    <div className='bottom-left'>
                        {spot.SpotImages[3] ? (<img className='bottom-left-image' alt={`spotImg-${spot.SpotImages[3].id}`} src={spot.SpotImages[3].url}></img>) : <p>No Image Available</p>}
                    </div>
                    <div className='bottom-right'>
                        {spot.SpotImages[4] ? (<img className='bottom-right-image' alt={`spotImg-${spot.SpotImages[4].id}`} src={spot.SpotImages[4].url}></img>) : <p>No Image Available</p>}
                    </div>
                </div>
            </div>
            <div className='spot-details-reviews'>
                <h2>Reviews</h2>
                {reviews && Object.values(reviews).length > 0 ? Object.values(reviews).map((review) => (
                    <SpotReview key={`review-${review.id}`} review={review} />
                )) :
                <h2>Spot doesn't have any reviews.</h2>
                }
            </div>
            <NavLink to={`/spots/${spotId}/reviews/new`}>Create A Review</NavLink>
        </div>
    )
}

export default SpotDetails;
