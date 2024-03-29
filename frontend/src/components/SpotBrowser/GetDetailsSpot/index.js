import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpot } from "../../../store/spots";
import { fetchReviewsBySpotId, removeReview } from "../../../store/reviews";
import { useParams } from 'react-router-dom';
import ReviewConfirmationalModal from "../../OpenReviewModal";
import { useModal } from "../../../context/Modal";
import DeleteReviewModal from "../../OpenDeleteReviewModal";
import styles from './GetDetailsSpot.module.css'

const GetDetailsSpot = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {setModalContent, closeModal} = useModal();
    console.log("id from useParams:", id);

    const spot = useSelector((state) => {
        console.log('MY SPOT', state.spots.currentSpot)
        // if(spot){
        //     console.log('the last spot', spot.SpotImages.slice(-1).url)
        // }
       return state.spots.currentSpot
    })

    const reviews = useSelector((state) => {
        // console.log('IN THE USESELECTPR', state.reviews)
        console.log("-------REVIEWS VARIABLE", state.reviews.reviewsBySpotId[id])
        return state.reviews.reviewsBySpotId[id]
    })

    const reviewers = useSelector((state) =>{
        let usr_ls = []
        let allreviews = state.reviews.reviewsBySpotId[id]
        if(allreviews){
            allreviews.forEach(review => {
                usr_ls.push(review['userId'])
           })
        }
        return usr_ls
    })


    const userId = useSelector((state) => {
        if(state.session.user){
            return state.session.user.id
        }
    })

    const openReviewModal = (spotId) => {
        setModalContent(
            <ReviewConfirmationalModal spotId={spotId} closeModal={closeModal} updateReviews={updateReviews}/>
        )
    }

    // useEffect(() => {
    //     if (userId) {
    //         console.log('currentuser:', userId);
    //     }
    // }, [spot]);

    const updateReviews = async () => {
        await dispatch(fetchReviewsBySpotId(id))
    }

    const deleteReview = (spotId, reviewId) => {
        dispatch(removeReview(spotId, reviewId))
    }

    useEffect(() => {
        dispatch(fetchSpot(id));
    }, [dispatch, id])


    useEffect(() => {
        console.log('Fetching reviews for spot ID:', id)
        dispatch(fetchReviewsBySpotId(id))
    }, [dispatch, id])



    if(!spot){
        return <div>Sorry there is no Spot here</div>
    }


    const handleReserveClick = () => {
        alert("Feature coming soon");
    };

    const renderRating = () => {
        if(!spot.numReviews){
            return <span>New</span>
        }else {
            return <span>{spot.avgStarRating.toFixed(2)}</span>
        }
    }

    const renderReviewsCount = () => {
        console.log('INSIDE RENDERREVIEWS FUNCTION', spot)
        if(spot.numReviews === 0){
            return null
        } else if(spot.numReviews === 1){
            return <span>1 Review</span>
        }else {
            return <span>{spot.numReviews} Reviews</span>
        }
    }

    const renderReviews = () => {

        if(!reviews || reviews.length === 0){
            if((spot.owner_id !== userId) && (userId)){
                return <div>
                            <h2 className={styles.rating}>
                            <   i className="fas fa-star"></i> {renderRating()} {spot.numReviews > 0}
                            </h2>
                    Be the first to post a review!
                    </div>
            }else{
                return <div>
                        <h2 className={styles.rating}>
                            < i className="fas fa-star"></i> {renderRating()} {spot.numReviews > 0}
                        </h2>
                    No reviews have been posted yet.</div>
            }
        }


        return (
            <div>
                {/* <h2>Reviews</h2> */}
                <h2 className={styles.rating}>
                    <i className="fas fa-star"></i> {renderRating()} {spot.numReviews > 0 && "·"} {renderReviewsCount()}
                </h2>
                {reviews
                    .slice()
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((review) => (
                        <div key={review.id}>
                        <p>
                            {review.User.firstName}
                            <div className={styles.date}>
                                {new Date(review.createdAt).toLocaleString("default", {
                                month: "long",
                                year: "numeric",
                                })}
                            </div>
                        </p>
                        <p>{review.review}</p>

                        {review.User.id === userId && (
                            <button
                                onClick={() => {
                                    setModalContent(
                                        <DeleteReviewModal
                                            closeModal={closeModal}
                                            deleteReview={() => deleteReview(review.spotId, review.id)}
                                        />
                                    )
                                }}
                            >
                            Delete
                            </button>
                        )}
                        </div>
                    ))}
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
            <h1 className={styles.title}>{spot.name}</h1>
            <p className={styles.location}>Location: {spot.city}, {spot.state}, {spot.country}</p>
            <div className={styles.imageContainer}>
                {/* <img src={spot.SpotImages} alt={spot.name} /> */}
                {spot.SpotImages && spot.SpotImages.length > 0 ? (
                <>
                    <div className={styles.largeImage}>

                        <img src={spot.SpotImages.slice(-1)[0].url} alt={`Spot image 1`} />
                        {/* { console.log('the last spot', spot.SpotImages.slice(-1)[0].url)} */}
                    </div>
                    <div className={styles.smallImages}>
                        {spot.SpotImages.slice(0, -1).map((obj, index) => (
                            <img key={index} src={obj.url} alt={`Spot image ${index}`} />
                        ))}
                    </div>
                </>
            ): (
                <div>No images available for this spot</div>
            )}
            </div>

            <p className={styles.host}>Hosted by {spot.Owner.firstName}, {spot.Owner.lastName}</p>

            <div className={styles.pandprice}>
                <p className={styles.paragraph}>{spot.description}</p>
                <div className={styles.priceDetails}>
                    <div className={styles.priceDetailscontainer}>
                        <h4>{spot.price} per night</h4>
                        <p className={styles.rating}>
                            <i className="fas fa-star"></i> {renderRating()} {spot.numReviews > 0 && "·"} {renderReviewsCount()}
                        </p>
                    </div>
                <button className={styles.reserveBtn} onClick={handleReserveClick}>Reserve</button>
                </div>
            </div>

            <div className={styles.reviews}>{}{renderReviews()}</div>

            <div>
                {userId && (userId !== spot.owner_id) && (!reviewers.includes(userId)) && (
                     <button className={styles.postreviewbtn} onClick={() => openReviewModal(spot.id)}>Post Your Review</button>
                )}
            </div>

        </div>

    </div>
    )
}

export default GetDetailsSpot
