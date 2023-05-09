import { csrfFetch } from "./csrf";
import { fetchSpot } from "./spots";

//action types
const GET_REVIEWS = 'reviews/GET_ALL_REVIEWS';
// const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
// const DELETE_REVIEW = 'reviews/DELETE';


//action creators
const getAllReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
});

// const createReview = (review) => ({
//     type: CREATE_REVIEW,
//     review
// });

// const deleteReview = (reviewId) => ({
//     type: DELETE_REVIEW,
//     reviewId
// })

//thunk action creators
export const fetchReviewsBySpotId = (spotId) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    // console.log('DA RESPONSE', data.Reviews)
    dispatch(fetchSpot(spotId))
    dispatch(getAllReviews(data.Reviews))
}

export const createReviewBySpotId = (spotId, review) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })
    dispatch(fetchReviewsBySpotId(spotId))
    if(response.ok){
        const newreview = await response.json();
        return newreview
    }else {
        // console.log('------------RESPONSE IS NOT OK')
        if(response.status === 403){
            throw { message: "User already has a review for this spot" };
        } else {
            throw { message: "The provided review data was invalid" };
        }

    }
}

export const removeReview = (spotId, reviewId) => async(dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if(response.ok){
        dispatch(fetchReviewsBySpotId(spotId))
        // dispatch(deleteReview(reviewId))
    }
}

const initialState = {
    reviewsBySpotId: {}
}
const reviewsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_REVIEWS:
            return {
                ...state,
                reviewsBySpotId: {
                    [action.reviews[0].spotId]: action.reviews,
                }

            }
        // case CREATE_REVIEW:
        //     return {
        //         ...state,
        //         reviewsBySpotId: {
        //             [action.review.spotId]: [action.review],
        //         }

        //     }


        // case DELETE_REVIEW:
        //     const spotId = Object.keys(state.reviewsBySpotId)
        //     const newState = {...state};
        //     newState.reviewsBySpotId[spotId] = state.reviewsBySpotId[spotId].filter(
        //         (ele) => ele.id !== action.reviewId
        //     )
        //     return newState
        default:
            return state
    }
}

export default reviewsReducer
