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
                    <div className='spot-name-price spot-name-grey'>{spot.name}</div>
                    <div className='spot-name-price'>${spot.price} a night.</div>
                </div>
            </NavLink>
            <button className='button clickable' onClick={dispatchDelete}>Delete <i className="fa-solid fa-trash"></i></button>
            <button className='button clickable' onClick={handleClick}>Edit <i className="fa-solid fa-pen-to-square"></i></button>
        </div>

    )
}

export default CurrentUserSpot;
