import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as reviewsActions from '../../../store/reviews';
import { Redirect } from 'react-router-dom';
import './CreateSpotReviewForm.css';
import { getSpotDetailsThunk } from '../../../store/spots';

function CreateSpotReviewForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();

    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId))
    }, [dispatch])

    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState('');

    const user = useSelector(state => state.session.user);
    // Once user reviews is added, add error validation for user already has a review for this spot.
    if (!user) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (review.length > 255) setErrors('Review must be less than 255 characters.');

        if(errors.length){
            return;
        }

        const newReview = {
            review,
            stars
        }

        return dispatch(reviewsActions.createAReviewThunk(newReview, spotId))
            .then(() => {
                setReview('')
                setStars('')
                history.push(`/spots/${spotId}`)
            })
            .catch(
                async (response) => {
                    const data = await response.json();
                    if (data && data.message) {
                        setErrors(data.message);
                    }
                }
            )
    };


    return (
        <div>
            <h1>Create A Review</h1>
            <form onSubmit={handleSubmit}>
                <ul className="errors">
                    <li key={errors}>{errors}</li>
                </ul>
                <label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder='Review'
                        required
                    />
                </label>
                <label>
                    <input
                        type="number"
                        value={stars}
                        min={0}
                        max={5}
                        onChange={(e) => setStars(e.target.value)}
                        placeholder='Stars'
                        required
                    />
                </label>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    )
}

export default CreateSpotReviewForm;
