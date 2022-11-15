import React from 'react';
import { useEffect } from 'react';
import * as spotsActions from '../../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './AllSpots.css';

function AllSpots() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.allSpots);
    // console.log(spots)

    useEffect(() => {
        dispatch(spotsActions.getAllSpotsThunk())
    }, [dispatch])

    if (!spots) return null;

    return (
        <div>
            <ul className='all-spots'>
                {Object.values(spots).map((spot) => {
                    return (
                        <NavLink className='spot-link' to={`/spots/${spot.id}`} key={spot.id}>
                            <div className='spot'>
                                <img src={spot.previewImage} alt={spot.name} className='spot-image'></img>
                                <h3 key={spot.id} className='spot-title'>{spot.city}, {spot.state}</h3>
                                <p className='spot-rating'>Average Rating: {spot.avgRating} ★</p>
                                <p className='spot-description'>{spot.description}</p>
                                <p>${spot.price} a night.</p>
                            </div>
                        </NavLink>
                    )
                })}
            </ul>
        </div>
    )
}

export default AllSpots;
