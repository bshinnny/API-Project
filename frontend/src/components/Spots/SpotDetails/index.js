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
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(spotsActions.getSpotDetailsThunk(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(reviewsActions.getSpotReviewsThunk(spotId))
    }, [dispatch, spotId])

    if (!spot) return null;

    return (
        <div className='spot-details-div'>
            <h1 className='spot-name'>{spot.name}</h1>
            <div className='spot-details-header'>
                <p className='avg-rating'>
                    <i className="fa-solid fa-star"></i>{spot.numReviews === 0 ? `0`:`${spot.avgStarRating}`}
                </p>
                <p className='divider'>·</p>
                <p className='review-header-info'>
                    {spot.numReviews === 0 || spot.numReviews > 1 ?`${spot.numReviews} reviews` : `${spot.numReviews} review`}
                </p>
                <p className='divider'>·</p>
                <p>
                <i class="fa-solid fa-medal"></i> Superhost
                </p>
                <p className='divider'>·</p>
                <p className='review-header-info'>
                    {`${spot.city}, ${spot.state}, ${spot.country}`}
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
            <div className='details-container'>
                <div className='profile-info-div'>
                    <div className='spot-info'>
                        <h2 className='hosted-by'>{`Entire spot hosted by ${spot.Owner.firstName}.`}</h2>
                        <div className='room-info-div'>
                            <p className='room-info'>
                                8 guests
                            </p>
                            <p className='divider'>·</p>
                            <p className='room-info'>
                                3 bedrooms
                            </p>
                            <p className='divider'>·</p>
                            <p className='room-info'>
                                6 beds
                            </p>
                            <p className='divider'>·</p>
                            <p className='room-info'>
                                4 baths
                            </p>
                        </div>
                    </div>
                    <div className='profile-pic'>
                        <i class="fa-solid fa-address-card fa-2x"></i>
                    </div>
                </div>
                <ul className='check-in'>
                    <li>
                        <h3 className='check-in-header'>{`${spot.Owner.firstName} is a Superhost.`}</h3>
                        <p className='check-in-detail'>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                    </li>
                    <li>
                        <h3 className='check-in-header'>Great check-in experience!</h3>
                        <p className='check-in-detail'>100% of recent guests gave the check-in process a 5-star rating.</p>
                    </li>
                    <li>
                        <h3 className='check-in-header-last'>Free cancellation for 48 hours.</h3>
                    </li>
                </ul>
                <div className='spot-details-description'>
                    <p className='spot-details-description-text'>{`${spot.description} Book now for an enjoyable stay in this spacious and aesthetically pleasing house.`}</p>
                </div>
            </div>
            <div className='spot-details-reviews'>
                <h2 className='reviews-h2'>
                    <i className="fa-solid fa-star"></i>{spot.numReviews === 0 ? `0`:`${spot.avgStarRating}`}
                    <p className='divider'>·</p>
                    {spot.numReviews === 0 || spot.numReviews > 1 ?`${spot.numReviews} reviews!` : `${spot.numReviews} review!`}
                </h2>
            </div>
            <div className='reviews-container'>
                {reviews && Object.values(reviews).length > 0 ? Object.values(reviews).map((review) => (
                    <SpotReview key={`review-${review.id}`} review={review} spot={spot} />
                )) :
                <h2 className='reviews-h2'>Spot doesn't have any reviews. Be the first below!</h2>
                }
            </div>
            <div className='create-review-div'>
                {user && spot.Owner.id !== user.id && (<NavLink className='nav-link create-review' to={`/spots/${spotId}/reviews/new`}>Create A Review</NavLink>)}
            </div>
        </div>
    )
}

export default SpotDetails;
