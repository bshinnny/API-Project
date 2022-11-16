import React from 'react';
import { useEffect } from 'react';
import * as spotsActions from '../../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './CurrentUserSpots.css';
import CurrentUserSpot from '../CurrentUserSpot';
import './CurrentUserSpots.css'

function CurrentUserSpots() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.userSpots);
    const user = useSelector(state => state.session.user);

    // console.log(`Spots from current user spots:`,spots)

    useEffect(() => {
        dispatch(spotsActions.getUserSpotsThunk())
    }, [dispatch])

    if (!user) return <Redirect to="/" />;

    if (!spots) return <h1>User has no spots.</h1>;

    return (
        <div>
            <ul className='user-spots'>
            {Object.values(spots).map((spot) => {
                    return (
                        <CurrentUserSpot key={`spot-${spot.id}`} spot={ spot } />
                    )
                })}
            </ul>
        </div>
    )
}

export default CurrentUserSpots;
