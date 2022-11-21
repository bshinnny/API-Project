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
    }, [dispatch, spotId])

    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState('');

    const user = useSelector(state => state.session.user);
    // Once user reviews is added, add error validation for user already has a review for this spot.
    if (!user) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (review.length > 255) {
            setErrors('Review must be less than 255 characters.');
            return;
        }
        // if (stars < 1 || stars > 5) setErrors('Stars must be an integer from 1-5.')

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
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                }
            )
    };


    return (
        <div className='review-div'>
            <form className='create-review form' onSubmit={handleSubmit}>
                <h1>Create A Review</h1>
                <ul className="errors">
                    {errors && <li className='create-review-form-errors' key={errors}>{errors}</li>}
                </ul>
                <label className='label review'>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder='Share your thoughts on this spot!'
                        required
                        className='input review'
                    />
                </label>
                <label className='label stars'>
                    <input
                        type="number"
                        value={stars}
                        min={1}
                        max={5}
                        onChange={(e) => setStars(e.target.value)}
                        placeholder='Stars'
                        required
                        className='input stars'
                    />
                </label>
                <button className='submit-button clickable' type="submit">Submit Review</button>
            </form>
        </div>
    )
}

export default CreateSpotReviewForm;
