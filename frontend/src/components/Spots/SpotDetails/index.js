import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, useHistory } from "react-router-dom";
import * as spotsActions from '../../../store/spots';
import * as reviewsActions from '../../../store/reviews';
import * as bookingActions from '../../../store/bookings';
import SpotReview from '../../Reviews/SpotReview';
import './SpotDetails.css';
import { useState } from 'react';

function SpotDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();

    const spot = useSelector(state => state.spots.spotDetails);
    const reviews = useSelector(state => state.reviews.spotReviews);
    const user = useSelector(state => state.session.user);

    const [checkIn, setCheckIn] = useState('TEST')
    const [checkOut, setCheckOut] = useState(new Date())
    const [guests, setGuests] = useState('1')
    const [errors, setErrors] = useState('')

    // console.log('IN',new Date(checkIn));
    // console.log(new Date(checkOut));
    // console.log(new Date(checkIn + 1) > new Date(checkOut + 1));

    // const testDate = new Date();
    // console.log(checkIn)


    useEffect(() => {
        dispatch(spotsActions.getSpotDetailsThunk(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(reviewsActions.getSpotReviewsThunk(spotId))
    }, [dispatch, spotId])

    const handleSubmit = async (e) => {
        // e.preventDefault();

        const errors = [];

        if (new Date(checkIn + 1) >= new Date(checkOut + 1)) errors.push('Checkout cannot be before check in.');
        if (user.id === spot.ownerId) errors.push('You cannot book your own spot.')

        // console.log(errors)

        setErrors(errors);

        if(errors.length){
            return;
        }

        const bookingDates = {
            checkIn,
            checkOut
        };

        // console.log(bookingDates);

        return dispatch(bookingActions.createBookingThunk(bookingDates, spotId))
            .then((booking) => {
                setCheckIn('')
                setCheckOut('')
                setErrors([])
                history.push('/bookings/current')
            })
    }


    if (!spot) return null;

    return (
        <div className='spot-details-div'>
            <h1 className='spot-name'>{spot.name}</h1>
            <div className='spot-details-header'>
                <p className='avg-rating'>
                    <i className="fa-solid fa-star"></i>{Number(spot.numReviews) < 1 ? `New`:`${Number(spot.avgStarRating).toFixed(1)}`}
                </p>
                <p className='divider'>·</p>
                <p className='review-header-info'>
                    {Number(spot.numReviews) === 0 || Number(spot.numReviews) > 1 ?`${Number(spot.numReviews)} reviews` : `${Number(spot.numReviews)} review`}
                </p>
                <p className='divider'>·</p>
                <p>
                <i className="fa-solid fa-medal"></i> Superhost
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
                <div className='other-images'>
                    {spot.SpotImages[1] ? (<img className='top-left-image' alt={`spotImg-${spot.SpotImages[1].id}`} src={spot.SpotImages[1].url}></img>) : <p>No Image Available</p>}
                    {spot.SpotImages[2] ? (<img className='top-right-image' alt={`spotImg-${spot.SpotImages[2].id}`} src={spot.SpotImages[2].url}></img>) : <p>No Image Available</p>}
                    {spot.SpotImages[3] ? (<img className='bottom-left-image' alt={`spotImg-${spot.SpotImages[3].id}`} src={spot.SpotImages[3].url}></img>) : <p>No Image Available</p>}
                    {spot.SpotImages[4] ? (<img className='bottom-right-image' alt={`spotImg-${spot.SpotImages[4].id}`} src={spot.SpotImages[4].url}></img>) : <p>No Image Available</p>}
                </div>
            </div>
            <div className='details-booking-cont'>
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
                            <i className="fa-solid fa-address-card fa-2x"></i>
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
                <div className='bookings-container'>
                    <div className='booking-form-div'>
                        <div className='booking-header'>
                            <div className='price-cont-bookings'>
                                <div className='nightly-price'>{`$${spot.price}`}</div>
                                <div className='night-text'>a night.</div>
                            </div>
                            <div className='bookings-reviews'>
                                <p className='avg-rating'>
                                    <i className="fa-solid fa-star"></i>{Number(spot.numReviews) < 1 ? `New`:`${Number(spot.avgStarRating).toFixed(1)}`}
                                </p>
                                <p className='divider'>·</p>
                                <p className='review-header-info'>
                                    {Number(spot.numReviews) === 0 || Number(spot.numReviews) > 1 ?`${Number(spot.numReviews)} reviews` : `${Number(spot.numReviews)} review`}
                                </p>
                            </div>
                        </div>
                        <div className='booking-input-div'>
                            <form className='booking-form'>
                                <div className='booking-form-input-div'>
                                    <div className='checkin-checkout-div'>
                                        <div className='booking-form-text'>CHECK-IN</div>
                                        <input
                                            className='booking-input'
                                            type='date'
                                            value={checkIn}
                                            onChange={(e) => setCheckIn(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='checkin-checkout-div co'>
                                        <div className='booking-form-text'>CHECK-OUT</div>
                                        <input
                                            className='booking-input'
                                            type='date'
                                            value={checkOut}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='guests-div'>
                                    <div className='booking-form-text'>GUESTS</div>
                                    <select
                                        className='booking-input-guests'
                                        type='number'
                                        value={guests}
                                        onChange={(e) => setGuests(e.target.value)}
                                        required
                                    >
                                        <option value='1'>1 guest</option>
                                        <option value='2'>2 guests</option>
                                        <option value='3'>3 guests</option>
                                        <option value='4'>4 guests</option>
                                        <option value='5'>5 guests</option>
                                        <option value='6'>6 guests</option>
                                        <option value='7'>7 guests</option>
                                        <option value='8'>8 guests</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div>
                            {errors.length > 0 && (
                                <div className='errors'>
                                    {errors.map((error) => (
                                        <div key={error}>{error}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button
                            className="submit-button clickable reserve"
                            onClick={() => handleSubmit()}
                        >
                            RESERVE
                        </button>
                    </div>
                </div>
            </div>
            <div className='spot-details-reviews'>
                <h2 className='reviews-h2'>
                    <i className="fa-solid fa-star"></i>{Number(spot.numReviews) === 0 ? `New`:`${Number(spot.avgStarRating).toFixed(1)}`}
                    <p className='divider'>·</p>
                    {Number(spot.numReviews) === 0 || Number(spot.numReviews) > 1 ?`${Number(spot.numReviews)} reviews!` : `${Number(spot.numReviews)} review!`}
                </h2>
                <div className='create-review-div'>
                    {user && spot.Owner.id !== user.id && (<NavLink className='nav-link create-review' to={`/spots/${spotId}/reviews/new`}>Create A Review</NavLink>)}
                </div>
            </div>
            <div className='reviews-container'>
                {reviews && Object.values(reviews).length > 0 ? Object.values(reviews).map((review) => (
                    <SpotReview key={`review-${review.id}`} review={review} spot={spot} />
                )) :
                <h2 className='reviews-h2'>Spot doesn't have any reviews. Be the first!</h2>
                }
            </div>
            {/* <div className='create-review-div'>
                {user && spot.Owner.id !== user.id && (<NavLink className='nav-link create-review' to={`/spots/${spotId}/reviews/new`}>Create A Review</NavLink>)}
            </div> */}
        </div>
    )
}

export default SpotDetails;
