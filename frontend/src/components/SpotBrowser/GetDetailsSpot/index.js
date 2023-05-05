import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpot } from "../../../store/spots";
import { fetchReviewsBySpotId } from "../../../store/reviews";
import { useParams } from 'react-router-dom';

const GetDetailsSpot = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    // console.log("id from useParams:", id);

    const spot = useSelector((state) => {
       return state.spots.currentSpot
    })

    const reviews = useSelector((state) => {
        console.log('IN THE USESELECTPR', state.reviews)
        return state.reviews.reviewsBySpotId[id]
    })

    const userId = useSelector((state) => {
        return state.session.user.id
    })

    // useEffect(() => {
    //     if (userId) {
    //         console.log('currentuser:', userId);
    //     }
    // }, [spot]);

    useEffect(() => {
        dispatch(fetchSpot(id));
        dispatch(fetchReviewsBySpotId(id))
    }, [dispatch, id])


    if(!spot){
        return <div>Sorry there is no Spot here</div>
    }


    const handleReserveClick = () => {
        alert("Feature coming soon");
    };

    const renderRating = () => {
        if(spot.numReviews === 0){
            return <span>New</span>
        }else {
            return <span>{spot.avgStarRating.toFixed(2)}</span>
        }
    }

    const renderReviewsCount = () => {
        if(spot.numReviews === 0){
            return null
        } else if(spot.numReviews === 1){
            return <span>1 Review</span>
        }else {
            return <span>{spot.numReviews}</span>
        }
    }

    const renderReviews = () => {
        if(!reviews || reviews.length === 0){
            if((spot.owner_id !== userId) && (userId)){
                return <div>Be the first to post a review!</div>
            }else{
                return <div>No reviews have been posted yet.</div>
            }
        }
        return (
            <div>
                <h2>Reviews</h2>
                {reviews
                    .slice()
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((review) => (
                        <div key={review.id}>
                        <p>
                            {review.User.firstName} -{" "}
                            {new Date(review.createdAt).toLocaleString("default", {
                            month: "long",
                            year: "numeric",
                            })}
                        </p>
                        <p>{review.review}</p>
                        </div>
                    ))}
            </div>
        )
    }
    return (
        <div>
            <h1>{spot.name}</h1>
            <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
            <div>
                {/* <img src={spot.SpotImages} alt={spot.name} /> */}
                {spot.SpotImages && spot.SpotImages.length > 0 ? (
                <div>
                    {spot.SpotImages.map((obj, index) => (
                        // <>
                        // {console.log(obj)}
                         <img key={index} src={obj.url} alt={`Spot image ${"index + 1"}`} />
                        // </>

                    ))}
                </div>
            ): (
                <div>No images available for this spot</div>
            )}
            </div>
            <p>Hosted by {spot.id}</p>
            <div>
                <p>{spot.price} per night</p>
                <p>
                    <i className="fas fa-star"></i> {renderRating()} {spot.numReviews > 0 && "·"} {renderReviewsCount()}
                </p>
                <button onClick={handleReserveClick}>Reserve</button>
            </div>
            <div>
                {renderReviews()}
            </div>
        </div>
    )
}

export default GetDetailsSpot
