import React from 'react';
// import { useEffect } from 'react';
import * as spotsActions from '../../../store/spots';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import './CurrentUserSpot.css';

function CurrentUserSpot({ spot }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const dispatchDelete = (e) => {
        e.preventDefault();
        dispatch(spotsActions.deleteASpotThunk(spot.id));
    }

    const handleClick = (e) => {
        e.preventDefault();
        history.push(`/spots/${spot.id}/edit`)
    }

    return (
        <div>
            <NavLink className='spot-link' to={`/spots/${spot.id}`} key={spot.id}>
                <div className='spot'>
                    <img src={spot.previewImage} alt={spot.name} className='spot-image'></img>
                    <h3 key={spot.id} className='spot-title'>{spot.city}, {spot.state}</h3>
                    <p className='spot-rating'>Average Rating: {spot.avgRating} ★</p>
                    <p className='spot-description'>{spot.description}</p>
                    <p>${spot.price} a night.</p>
                </div>
            </NavLink>
            <button onClick={dispatchDelete}>Delete <i class="fa-solid fa-trash"></i></button>
            <button onClick={handleClick}>Edit <i class="fa-solid fa-pen-to-square"></i></button>
        </div>

    )
}

export default CurrentUserSpot;
