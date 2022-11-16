import "./SpotReview.css"

function SpotReview({ review }) {

    const date = new Date(review.createdAt);
    const year = date.getFullYear();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

    return (
        <div>
            <p className="review-user-name">{review.User.firstName}</p>
            <p className="review-create-date">{`${month} ${year}`}</p>
            <p className="user-review">{review.review}</p>
        </div>
    )
}

export default SpotReview;
