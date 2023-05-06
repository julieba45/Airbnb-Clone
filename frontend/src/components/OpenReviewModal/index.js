
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { createReviewBySpotId} from "../../store/reviews";

const ReviewConfirmationalModal = ({spotId, closeModal, updateReviews}) => {
    const dispatch = useDispatch()
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const handleCommentChange = (e) => {
        setReview(e.target.value);
    };

    const handleRatingChange = (e) => {
        setStars(parseInt(e.target.value, 10));
    };

    const resetForm = () => {
        setReview('');
        setStars(0);
        setErrorMessage("");
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const createdReview = await dispatch(createReviewBySpotId(spotId, { review, stars }));
            // console.log('-----------------FINISHED DISPATCH REVIEW ACTION')
            if (!createdReview) {
                console.log('No created review');
                throw new Error("The provided review data was invalid");
            }
            updateReviews()
            // dispatch(fetchReviewsBySpotId(spotId));
            closeModal();
            resetForm();                    //reset the form after submitting
        } catch (error) {
            // console.log('---------------FINISHED DISPATCH REVIEW AND GET ERROR')
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else if (error.status === 403) {
                setErrorMessage("User already has a review for this spot");
            } else if (error.statusText) {
                setErrorMessage(error.statusText);
            }
        }

    }
    return (
        <div>
            <h1>How was your stay?</h1>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <textarea
                placeholder="Leave your review here ..."
                value={review}
                onChange={handleCommentChange}
            />
            <label>
                Stars
                <input type="number" min="1" max="5" value={stars} onChange={handleRatingChange}></input>
            </label>
            <button onClick={handleSubmit}
                disabled={review.length < 10 || stars === 0}
            >
                Submit Your Review
            </button>
        </div>
    )
}

export default ReviewConfirmationalModal
