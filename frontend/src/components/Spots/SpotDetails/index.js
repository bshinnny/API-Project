import React from 'react';
import { useEffect } from 'react';
import * as spotsActions from '../../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import './SpotDetails.css'

function SpotDetails() {
    const dispatch = useDispatch()
    const { spotId } = useParams();

    const spot = useSelector(state => state.spots.spotDetails);

    useEffect(() => {
        dispatch(spotsActions.getSpotDetailsThunk(spotId))
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
        </div>
    )
}

export default SpotDetails;
