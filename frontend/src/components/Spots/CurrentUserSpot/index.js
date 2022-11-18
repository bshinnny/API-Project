import React from 'react';
// import { useEffect } from 'react';
import * as spotsActions from '../../../store/spots';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import './CurrentUserSpot.css';

function CurrentUserSpot({ spot }) {
    const dispatch = useDispatch();
    const history = useHistory();
    // const spots = useSelector(state => state.spots.userSpots)

    const dispatchDelete = (e) => {
        e.preventDefault();
        dispatch(spotsActions.deleteASpotThunk(spot.id));
    }

    const handleClick = (e) => {
        e.preventDefault();
        history.push(`/spots/${spot.id}/edit`)
    }

    return (
        <div className='user-spot-card'>
            <NavLink className='spot-link' to={`/spots/${spot.id}`} key={spot.id}>
                <div className='spot'>
                    <img src={spot.previewImage} alt={spot.name} className='spot-image'></img>
                    <div className='title-rating'>
                        <h3 key={spot.id} className='spot-title'>{spot.city}, {spot.state}</h3>
                        <h3 className='spot-rating'>{spot.avgRating ? `★ ${spot.avgRating}`:`★ New`}</h3>
                    </div>
                    <p className='spot-description'>{spot.description}</p>
                    <p>${spot.price} a night.</p>
                </div>
            </NavLink>
            <button className='button' onClick={dispatchDelete}>Delete <i className="fa-solid fa-trash"></i></button>
            <button className='button' onClick={handleClick}>Edit <i className="fa-solid fa-pen-to-square"></i></button>
        </div>

    )
}

export default CurrentUserSpot;
