import React from 'react';
import { useEffect } from 'react';
import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';

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
                        <div>
                            <h2 key={spot.id}>{spot.name}</h2>
                            <img src={spot.previewImage} alt={spot.name}></img>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default AllSpots;
