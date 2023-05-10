
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { createReviewBySpotId} from "../../store/reviews";
import reviewmodalstyles from "./OpenReviewModal.module.css"
import Star from "./star";

const ReviewConfirmationalModal = ({spotId, closeModal, updateReviews}) => {
    const dispatch = useDispatch()
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const handleCommentChange = (e) => {
        setReview(e.target.value);
    };

    const handleRatingChange = (rating) => {
        setStars(rating);
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
        <div className={reviewmodalstyles.container}>
            <h1>How was your stay?</h1>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <textarea className={reviewmodalstyles.textarea}
                placeholder="Leave your review here ..."
                value={review}
                onChange={handleCommentChange}
            />
            <div>
                Stars
                {[1, 2, 3, 4, 5].map((starIndex) => (
                    <Star
                    key={starIndex}
                    filled={hoveredStar >= starIndex || stars >= starIndex}
                    onMouseEnter={() => setHoveredStar(starIndex)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => handleRatingChange(starIndex)}
                    />
                ))}
            </div>
            <button onClick={handleSubmit}
                disabled={review.length < 10 || stars === 0}
            >
                Submit Your Review
            </button>
        </div>
    )
}

export default ReviewConfirmationalModal
