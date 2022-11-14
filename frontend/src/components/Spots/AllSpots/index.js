import React from 'react';
import { useEffect } from 'react';
import * as spotsActions from '../../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

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
            <ul>
                {Object.values(spots).map((spot) => {
                    return (
                        <NavLink to={`spots/${spot.id}`}>
                            <div className='spot'>
                                <h1 key={spot.id}>{spot.name}</h1>
                                <img src={spot.previewImage} alt={spot.name}></img>
                                <p>Average Rating: {spot.avgRating} ★</p>
                                <p>{spot.description}</p>
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
