import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as reviewsActions from '../../../store/reviews';
import { getSpotDetailsThunk } from '../../../store/spots';
import "./SpotReview.css"

function SpotReview({ review, spot }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    const date = new Date(review.createdAt);
    const year = date.getFullYear();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

    // Check for 2 reviews from a single user?

    const dispatchDelete = (e) => {
        e.preventDefault();
        dispatch(reviewsActions.deleteAReviewThunk(review.id)).then(() => dispatch(getSpotDetailsThunk(spot.id)))
    }

    return (
        <div className='spot-review-card'>
            <div>
                <div className="review-user-name">{review.User.firstName}</div>
                <div className="review-create-date">{`${month} ${year}`}</div>
                <div className="user-review">{review.review}</div>
            </div>
            <div>
                {user && review.User.id === user.id && (
                    <button onClick={dispatchDelete}>Delete <i className="fa-solid fa-trash"></i></button>
                )}
            </div>
        </div>
    )
}

export default SpotReview;
