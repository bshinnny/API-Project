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
        </div>
    )
}

export default SpotDetails;
