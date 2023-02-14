import { useEffect } from 'react';
import * as spotsActions from '../../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import './SearchResults.css';

function SearchResults() {
    const { searchTerm } = useParams();
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.searchSpots);
    console.log(spots)

    useEffect(() => {
        dispatch(spotsActions.getSearchTermsThunk(searchTerm))
    }, [dispatch, searchTerm])

    // if (!spots) return null;

    return (
        <>
            {spots && Object.values(spots).length > 0 && <div className="spots-div">
                <div className='all-spots'>
                    {Object.values(spots).map((spot) => {
                        return (
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
                        )
                    })}
                </div>
            </div>}
        </>
    )
}

export default SearchResults;
